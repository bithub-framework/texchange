import { EventEmitter } from 'events';
import { OrderbookManager } from './orderbook-manager';
class Pushing extends EventEmitter {
    constructor(config, 
    // 必须保证 update 时数据的 time 等于 now()
    now) {
        super();
        this.config = config;
        this.now = now;
        this.tradeCount = 0;
        this.orderbook = new OrderbookManager(config, now);
    }
    updateTrades(rawTrades) {
        this.pushRawTrades(rawTrades);
    }
    updateOrderbook(orderbook) {
        this.orderbook.setBase(orderbook);
        this.orderbook.apply();
        this.pushOrderbook();
    }
    async pushOrderbook() {
        this.emit('orderbook', this.orderbook);
    }
    rawTrade2Trade(rawTrades) {
        return rawTrades.map(rawTrade => ({
            ...rawTrade,
            id: ++this.tradeCount,
        }));
    }
    async pushRawTrades(rawTrades) {
        const trades = this.rawTrade2Trade(rawTrades);
        this.emit('trades', trades);
    }
}
export { Pushing as default, Pushing, };
//# sourceMappingURL=1-pushing.js.map