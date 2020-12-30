import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
import {
    Orderbook,
    Trade,
    UnidentifiedTrade,
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

    public updateTrades(noidTrades: UnidentifiedTrade[]): void {
        this.pushNoidTrades(noidTrades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.orderbook.setBase(orderbook);
        this.orderbook.apply();
        this.pushOrderbook();
    }

    protected async pushOrderbook(): Promise<void> {
        this.emit('orderbook', this.orderbook);
    }

    protected noidTrade2Trade(noidTrades: UnidentifiedTrade[]): Trade[] {
        return noidTrades.map(noidTrade => ({
            ...noidTrade,
            id: ++this.tradeCount,
        }));
    }

    protected async pushNoidTrades(noidTrades: UnidentifiedTrade[]): Promise<void> {
        const trades = this.noidTrade2Trade(noidTrades);
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
