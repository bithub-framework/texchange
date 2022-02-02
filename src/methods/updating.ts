import {
    Orderbook,
    DatabaseTrade,
} from '../interfaces';
import assert = require('assert');
import { Hub } from '../hub';



export class MethodsUpdating {
    constructor(
        private core: Hub,
    ) { }

    /**
     * Make sure update all trades which have same timestamp at a time.
     * @param trades
     */
    public updateTrades(trades: DatabaseTrade[]): void {
        assert(trades.length);
        for (const trade of trades) {
            assert(trade.time === this.core.timeline.now());
            this.core.states.misc.updateDatabaseTrade(trade);
            this.core.taken.tradeTakesOpenMakers(trade);
        }
        this.core.interfaces.instant.pushTrades(trades);
        this.core.states.mtm.updateTrades(trades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        assert(orderbook.time === this.core.timeline.now());
        this.core.states.orderbook.setBasebook(orderbook);
        this.core.interfaces.instant.pushOrderbook();
    }
}
