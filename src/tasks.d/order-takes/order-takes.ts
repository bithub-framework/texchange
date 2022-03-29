import { inject } from 'injektor';
import {
    TexchangeOpenOrder,
    TexchangeOpenOrderStatic,
    TexchangeOrderIdStatic,
    Side,
    Operation,
    TexchangeTrades,
    HLike, H,
} from 'interfaces';
import { min } from '../../utilities';
import { Context } from '../../context';
import { OrderTakesLike } from './order-takes-like';
import { Broadcast } from '../../broadcast';

import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
import { Progress } from '../../models.d/progress';
import { Book } from '../../models.d/book';
import { OrderVolumesLike } from '../order-volumes/order-volumes-like';


export class OrderTakes<H extends HLike<H>>
    implements OrderTakesLike<H> {
    @inject(OrderTakes.TaskDeps)
    protected tasks!: OrderTakes.TaskDeps<H>;

    private OrderId = new TexchangeOrderIdStatic();
    private OpenOrder = new TexchangeOpenOrderStatic(this.context.H, this.OrderId);

    public constructor(
        protected context: Context<H>,
        protected models: OrderTakes.ModelDeps<H>,
        protected broadcast: Broadcast<H>,
    ) { }

    public $orderTakes($taker: TexchangeOpenOrder<H>): TexchangeTrades<H> {
        const { assets, progress, book } = this.models;
        const { config, timeline, calc } = this.context;
        const orderbook = book.getBook();

        const trades: TexchangeTrades<H> = [];
        let volume = this.context.H.from(0);
        let dollarVolume = this.context.H.from(0);
        for (const maker of orderbook[-$taker.side])
            if (
                (
                    $taker.side === Side.BID && $taker.price.gte(maker.price) ||
                    $taker.side === Side.ASK && $taker.price.lte(maker.price)
                ) && $taker.unfilled.gt(0)
            ) {
                const quantity = min($taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                $taker.filled = $taker.filled.plus(quantity);
                $taker.unfilled = $taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(calc.dollarVolume(maker.price, quantity))
                    .round(config.market.CURRENCY_DP);
                trades.push({
                    side: $taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }

        assets.pay(
            dollarVolume
                .times(config.account.TAKER_FEE_RATE)
                .round(config.market.CURRENCY_DP, H.RoundingMode.HALF_AWAY_FROM_ZERO)
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

export namespace OrderTakes {
    export interface ModelDeps<H extends HLike<H>> {
        margins: Margins<H>;
        assets: Assets<H>;
        progress: Progress<H>;
        book: Book<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        orderVolumes: OrderVolumesLike<H>;
    }
    export const TaskDeps = {};
}
