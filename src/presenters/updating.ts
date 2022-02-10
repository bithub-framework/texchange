import {
    Orderbook,
    DatabaseTrade,
} from '../interfaces';
import assert = require('assert');
import { type Hub } from '../hub';



export class Updating {
    constructor(private hub: Hub) { }

    /**
     * Make sure update all trades which have same timestamp at a time.
     * @param trades
     */
    public updateTrades(trades: DatabaseTrade[]): void {
        assert(trades.length);
        for (const trade of trades) {
            assert(trade.time === this.hub.context.timeline.now());
            this.hub.models.progress.updateDatabaseTrade(trade);
            this.hub.presenters.taken.tradeTakesOpenMakers(trade);
        }
        this.hub.views.instant.pushTrades(trades);
        this.hub.models.mtm.updateTrades(trades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        assert(orderbook.time === this.hub.context.timeline.now());
        this.hub.models.orderbooks.setBasebook(orderbook);
        this.hub.views.instant.pushOrderbook();
    }
}
