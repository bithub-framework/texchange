import {
    OpenOrder,
    Side,
    Operation,
    Trade,
} from 'interfaces';
import { min } from '../utilities';
import { Big, RoundingMode } from 'big.js';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderTakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class OrderTakes extends Task
    implements OrderTakesLike {
    constructor(
        protected readonly context: Context,
        protected readonly models: StatefulModels,
        protected readonly broadcast: Broadcast,
        protected readonly tasks: TasksLike,
    ) { super(); }

    /**
     * @param taker variable
     */
    public orderTakes(taker: OpenOrder): Trade[] {
        const { margin, assets, progress, book } = this.models;
        const { config, timeline } = this.context;
        const orderbook = book.getBook();

        const trades: Trade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
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
                .round(config.market.CURRENCY_DP, RoundingMode.RoundUp)
        );
        if (taker.operation === Operation.OPEN) {
            margin.incMargin(taker.length, volume, dollarVolume);
            assets.openPosition(taker.length, volume, dollarVolume);
        } else {
            margin.decMargin(assets, taker.length, volume, dollarVolume);
            assets.closePosition(taker.length, volume, dollarVolume);
        }

        return trades;
    }
}
