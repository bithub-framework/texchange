import {
    Side,
    Operation,
    HLike, H,
    OpenOrder,
    Trade,
    MarketSpec,
    AccountSpec,
} from 'secretary-like';
import { OpenMaker } from '../interfaces/open-maker';

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Makers } from '../models.d/makers/makers';
import { Margins } from '../models.d/margins';
import { Assets } from '../models.d/assets';
import { TaskOrderVolumes } from './order-volumes';


export class TaskTradeTakesOpenMakers<H extends HLike<H>> {
    @instantInject(TYPES.tasks)
    private tasks!: TaskTradeTakesOpenMakers.TaskDeps<H>;

    public constructor(
        @inject(TYPES.context)
        private context: Context<H>,
        @inject(TYPES.marketSpec)
        private marketSpec: MarketSpec<H>,
        @inject(TYPES.accountSpec)
        private accountSpec: AccountSpec,
        @inject(TYPES.models)
        private models: TaskTradeTakesOpenMakers.ModelDeps<H>,
        @inject(TYPES.broadcast)
        private broadcast: Broadcast<H>,
    ) { }

    public tradeTakesOpenMakers(trade: Trade<H>): void {
        const $trade = this.context.Data.Trade.copy(trade);
        for (const order of [...this.models.makers])
            if (this.$tradeShouldTakeOpenOrder($trade, order)) {
                this.$tradeTakesOrderQueue($trade, order);
                this.tradeTakesOpenMaker($trade, order);
            }
    }

    private $tradeShouldTakeOpenOrder(
        $trade: Trade<H>, maker: OpenOrder<H>,
    ): boolean {
        return (
            maker.side === Side.BID &&
            $trade.side === Side.ASK &&
            $trade.price.lte(maker.price)
            ||
            maker.side === Side.ASK &&
            $trade.side === Side.BID &&
            $trade.price.gte(maker.price)
        );
    }

    private $tradeTakesOrderQueue(
        $trade: Trade<H>,
        maker: OpenMaker<H>,
    ): void {
        const { makers } = this.models;
        if ($trade.price.eq(maker.price)) {
            const volume = this.context.Data.H.min($trade.quantity, maker.behind);
            $trade.quantity = $trade.quantity.minus(volume);
            makers.takeOrderQueue(maker.id, volume);
        } else makers.takeOrderQueue(maker.id);
    }

    private tradeTakesOpenMaker(
        $trade: Trade<H>,
        maker: OpenMaker<H>,
    ): void {
        const { assets, makers } = this.models;

        const volume = this.context.Data.H.min($trade.quantity, maker.unfilled);
        const dollarVolume = this.marketSpec
            .dollarVolume(maker.price, volume)
            .round(this.marketSpec.CURRENCY_DP);
        $trade.quantity = $trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);

        assets.pay(
            dollarVolume
                .times(this.accountSpec.MAKER_FEE_RATE)
                .round(this.marketSpec.CURRENCY_DP, H.RoundingMode.HALF_AWAY_FROM_ZERO)
        );
        if (maker.operation === Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: maker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: maker.length,
                volume,
                dollarVolume,
            });
    }
}

export namespace TaskTradeTakesOpenMakers {
    export interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        orderVolumes: TaskOrderVolumes<H>;
    }
}
