import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
class Pushing extends EventEmitter {
    constructor(config, 
    /** 必须保证 update 时数据的 time 等于 now() */
    now) {
        super();
        this.config = config;
        this.now = now;
        this.tradeCount = 0;
        this.orderbook = new OrderbookManager(config, now);
    }
    updateTrades(uTrades) {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
    }
    updateOrderbook(orderbook) {
        this.orderbook.setBase(orderbook);
        this.orderbook.apply();
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }
    async pushOrderbook() {
        this.emit('orderbook', this.orderbook);
    }
    uTrade2Trade(uTrades) {
        return uTrades.map(noidTrade => ({
            ...noidTrade,
            id: ++this.tradeCount,
        }));
    }
    async pushUTrades(noidTrades) {
        const trades = this.uTrade2Trade(noidTrades);
        this.emit('trades', trades);
    }
}
// interface Pushing extends EventEmitter {
//     emit(event: 'orderbook', orderbook: Orderbook): boolean;
//     emit(event: 'trades', trades: Trade[]): boolean;
//     emit(event: 'error', err: Error): boolean;
//     on(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
//     on(event: 'trades', listener: (trades: Trade[]) => void): this;
//     on(event: 'error', listener: (err: Error) => void): this;
//     off(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
//     off(event: 'trades', listener: (trades: Trade[]) => void): this;
//     off(event: 'error', listener: (err: Error) => void): this;
//     once(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
//     once(event: 'trades', listener: (trades: Trade[]) => void): this;
//     once(event: 'error', listener: (err: Error) => void): this;
// }
export { Pushing as default, Pushing, };
//# sourceMappingURL=1-pushing.js.map