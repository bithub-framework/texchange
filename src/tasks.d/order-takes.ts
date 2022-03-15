import {
    TexchangeOpenOrder,
    Side,
    Operation,
    TexchangeTrade,
    Length,
    HLike, H,
} from 'interfaces';
import { min } from '../utilities';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderTakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class OrderTakes<H extends HLike<H>> extends Task<H>
    implements OrderTakesLike<H> {
    constructor(
        protected readonly context: Context<H>,
        protected readonly models: StatefulModels<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: TasksLike<H>,
    ) { super(); }

    /**
     * @param taker variable
     */
    public orderTakes(taker: TexchangeOpenOrder.MutablePlain<H>): TexchangeTrade.MutablePlain<H>[] {
        const { margins, assets, progress, book } = this.models;
        const { config, timeline } = this.context;
        const orderbook = book.getBook();

        const trades: TexchangeTrade<H>[] = [];
        let volume = this.context.H.from(0);
        let dollarVolume = this.context.H.from(0);
        for (const maker of orderbook[-taker.side])
            if (
                (
                    taker.side === Side.BID && taker.price.gte(maker.price) ||
                    taker.side === Side.ASK && taker.price.lte(maker.price)
                ) && taker.unfilled.gt(0)
            ) {
                const quantity = min(taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(config.market.dollarVolume(maker.price, quantity))
                    .round(config.market.CURRENCY_DP);
                trades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }

        assets.payFee(
            dollarVolume
                .times(config.account.TAKER_FEE_RATE)
                .round(config.market.CURRENCY_DP, H.RoundingMode.HALF_AWAY_FROM_ZERO)
        );
        if (taker.operation === Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: taker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: taker.length,
                volume,
                dollarVolume,
            });

        return trades;
    }
}
