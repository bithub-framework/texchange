import { inject } from 'injektor';
import {
    Side,
    Operation,
    HLike, H,
} from 'interfaces';
import {
    OpenOrder,
    Trade,
    OpenMaker,
    TradeStatic,
    TradeIdStatic,
} from '../../interfaces';

import { Context } from '../../context';
import { TradeTakesOpenMakersLike } from './trade-takes-open-makers-like';
import { Broadcast } from '../../broadcast';

import { Makers } from '../../models.d/makers/makers';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
import { OrderVolumesLike } from '../order-volumes/order-volumes-like';


export class TradeTakesOpenMakers<H extends HLike<H>>
    implements TradeTakesOpenMakersLike<H> {

    private TradeId = new TradeIdStatic();
    private Trade = new TradeStatic(this.context.H, this.TradeId);

    public constructor(
        private tasks: TradeTakesOpenMakers.TaskDeps<H>,

        private context: Context<H>,
        private models: TradeTakesOpenMakers.ModelDeps<H>,
        private broadcast: Broadcast<H>,
    ) { }

    public tradeTakesOpenMakers(trade: Trade<H>): void {
        const $trade = this.Trade.copy(trade);
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
            const volume = this.context.H.min($trade.quantity, maker.behind);
            $trade.quantity = $trade.quantity.minus(volume);
            makers.takeOrderQueue(maker.id, volume);
        } else makers.takeOrderQueue(maker.id);
    }

    private tradeTakesOpenMaker(
        $trade: Trade<H>,
        maker: OpenMaker<H>,
    ): void {
        const { assets, makers } = this.models;

        const volume = this.context.H.min($trade.quantity, maker.unfilled);
        const dollarVolume = this.context.calc
            .dollarVolume(maker.price, volume)
            .round(this.context.config.market.CURRENCY_DP);
        $trade.quantity = $trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);

        assets.pay(
            dollarVolume
                .times(this.context.config.account.MAKER_FEE_RATE)
                .round(this.context.config.market.CURRENCY_DP, H.RoundingMode.HALF_AWAY_FROM_ZERO)
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

export namespace TradeTakesOpenMakers {
    export interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        orderVolumes: OrderVolumesLike<H>;
    }
}
