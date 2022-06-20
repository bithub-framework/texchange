import {
    Side,
    Operation,
    HLike, H,
    OpenOrder,
    Trade,
    MarketSpec,
    AccountSpec,
} from 'secretary-like';

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { MarginAssets } from '../models.d/margin-assets/margin-assets';
import { Assets } from '../models.d/margin-assets/assets';
import { Progress } from '../models.d/progress';
import { Book } from '../models.d/book';
import { TaskOrderVolumes } from './order-volumes';


export class TaskOrderTakes<H extends HLike<H>> {
    @instantInject(TYPES.tasks)
    private tasks!: TaskOrderTakes.TaskDeps<H>;

    public constructor(
        @inject(TYPES.context)
        private context: Context<H>,
        @inject(TYPES.marketSpec)
        private marketSpec: MarketSpec<H>,
        @inject(TYPES.accountSpec)
        private accountSpec: AccountSpec,
        @inject(TYPES.models)
        private models: TaskOrderTakes.ModelDeps<H>,
    ) { }

    public $orderTakes($taker: OpenOrder<H>): Trade<H>[] {
        const { assets, progress, book } = this.models;
        const orderbook = book.getBook();

        const trades: Trade<H>[] = [];
        let volume = new this.context.Data.H(0);
        let dollarVolume = new this.context.Data.H(0);
        for (const maker of orderbook[-$taker.side])
            if (
                (
                    $taker.side === Side.BID && $taker.price.gte(maker.price) ||
                    $taker.side === Side.ASK && $taker.price.lte(maker.price)
                ) && $taker.unfilled.gt(0)
            ) {
                const quantity = this.context.Data.H.min($taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                $taker.filled = $taker.filled.plus(quantity);
                $taker.unfilled = $taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.marketSpec.dollarVolume(maker.price, quantity))
                    .round(this.marketSpec.CURRENCY_DP);
                trades.push({
                    side: $taker.side,
                    price: maker.price,
                    quantity,
                    time: this.context.timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }

        assets.pay(
            dollarVolume
                .times(this.accountSpec.TAKER_FEE_RATE)
                .round(
                    this.marketSpec.CURRENCY_DP,
                    H.RoundingMode.HALF_AWAY_FROM_ZERO,
                ),
        );
        if ($taker.operation === Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: $taker.length,
                volume,
                dollarVolume,
            });

        return trades;
    }
}

export namespace TaskOrderTakes {
    export interface ModelDeps<H extends HLike<H>> {
        margins: MarginAssets<H>;
        assets: Assets<H>;
        progress: Progress<H>;
        book: Book<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        orderVolumes: TaskOrderVolumes<H>;
    }
}
