import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
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
    updateTrades(noidTrades) {
        this.pushNoidTrades(noidTrades);
    }
    updateOrderbook(orderbook) {
        this.orderbook.setBase(orderbook);
        this.orderbook.apply();
        this.pushOrderbook();
    }
    async pushOrderbook() {
        this.emit('orderbook', this.orderbook);
    }
    noidTrade2Trade(noidTrades) {
        return noidTrades.map(noidTrade => ({
            ...noidTrade,
            id: ++this.tradeCount,
        }));
    }
    async pushNoidTrades(noidTrades) {
        const trades = this.noidTrade2Trade(noidTrades);
        this.emit('trades', trades);
    }
}
export { Pushing as default, Pushing, };
//# sourceMappingURL=1-pushing.js.map