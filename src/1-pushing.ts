import { EventEmitter } from 'events';
import { OrderbookManager } from './orderbook-manager';
import {
    Orderbook,
    Trade,
    RawTrade,
    Config,
} from './interfaces';

class Pushing extends EventEmitter {
    protected tradeCount = 0;
    protected orderbookManager: OrderbookManager;

    constructor(
        protected config: Config,
        // 必须保证 update 时数据的 time 等于 now()
        protected now: () => number,
    ) {
        super();
        this.orderbookManager = new OrderbookManager(config, now);
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        this.pushRawTrades(rawTrades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.orderbookManager.setBase(orderbook);
        this.pushOrderbook();
    }

    protected async pushOrderbook(): Promise<void> {
        const orderbook = this.orderbookManager.getOrderbook();
        this.emit('orderbook', orderbook);
    }

    protected rawTrade2Trade(rawTrades: RawTrade[]): Trade[] {
        return rawTrades.map(rawTrade => ({
            ...rawTrade,
            id: ++this.tradeCount,
        }));
    }

    protected async pushRawTrades(rawTrades: RawTrade[]): Promise<void> {
        const trades = this.rawTrade2Trade(rawTrades);
        this.emit('trades', trades);
    }
}

export {
    Pushing as default,
    Pushing,
}
