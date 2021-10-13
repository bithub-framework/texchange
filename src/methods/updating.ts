import {
    Orderbook,
    DatabaseTrade,
} from '../interfaces';
import assert = require('assert');
import { Core } from '../core';



export class MethodsUpdating {
    constructor(
        private core: Core,
    ) { }

    public updateTrades(trades: DatabaseTrade[]): void {
        assert(trades.length);
        for (const trade of trades) {
            assert(trade.time === this.core.timeline.now());
            this.core.states.misc.updateDatabaseTrade(trade);
        }
        this.core.interfaces.instant.pushTrades(trades);
        for (const trade of trades) this.core.taken.tradeTakesOpenMakers(trade);
        this.core.states.mtm.updateTrades(trades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        assert(orderbook.time === this.core.timeline.now());
        this.core.states.orderbook.setBase(orderbook);
        this.core.states.orderbook.apply();
        this.core.interfaces.instant.pushOrderbook();
    }
}
