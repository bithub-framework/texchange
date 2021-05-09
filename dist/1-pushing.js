import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
import { clone, } from './interfaces';
class Texchange extends EventEmitter {
    constructor(config, 
    /** 必须保证 update 时数据的 time 等于 now() */
    now) {
        super();
        this.config = config;
        this.now = now;
        this.tradeCount = 0;
        this.bookManager = new OrderbookManager(config, now);
    }
    updateTrades(uTrades) {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
    }
    async pushUTrades(uTrades) {
        const trades = this.uTrade2Trade(uTrades);
        this.emit('trades', trades);
    }
    uTrade2Trade(uTrades) {
        return uTrades.map(uTrade => ({
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
            id: ++this.tradeCount,
        }));
    }
    updateOrderbook(orderbook) {
        this.bookManager.setBase(orderbook);
        this.bookManager.apply();
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }
    async pushOrderbook() {
        this.emit('orderbook', clone(this.bookManager.getBook()));
    }
}
export { Texchange, };
//# sourceMappingURL=1-pushing.js.map