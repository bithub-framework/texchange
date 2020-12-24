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
    protected orderbook: OrderbookManager;

    constructor(
        protected config: Config,
        // 必须保证 update 时数据的 time 等于 now()
        protected now: () => number,
    ) {
        super();
        this.orderbook = new OrderbookManager(config, now);
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        this.pushRawTrades(rawTrades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.orderbook.setBase(orderbook);
        this.pushOrderbook();
    }

    protected async pushOrderbook(): Promise<void> {
        this.emit('orderbook', this.orderbook);
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

interface Pushing extends EventEmitter {
    emit(event: 'orderbook', orderbook: Orderbook): boolean;
    emit(event: 'trades', trades: Trade[]): boolean;
    on(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    on(event: 'trades', listener: (trades: Trade[]) => void): this;
    off(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    off(event: 'trades', listener: (trades: Trade[]) => void): this;
    once(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    once(event: 'trades', listener: (trades: Trade[]) => void): this;
}

export {
    Pushing as default,
    Pushing,
}
