import { EventEmitter } from 'events';
import { OrderbookManager } from './managers/orderbook-manager';
import {
    Orderbook,
    Trade,
    UnidentifiedTrade,
    Config,
    clone,
} from './interfaces';

class Texchange extends EventEmitter {
    protected tradeCount = 0;
    protected book: OrderbookManager;

    constructor(
        protected config: Config,
        /** 必须保证 update 时数据的 time 等于 now() */
        protected now: () => number,
    ) {
        super();
        this.book = new OrderbookManager(config, now);
    }

    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        this.pushUTrades(uTrades);
    }

    protected pushUTrades(uTrades: UnidentifiedTrade[]): void {
        const trades = this.uTrade2Trade(uTrades);
        this.emit('trades', trades);
    }

    protected uTrade2Trade(uTrades: UnidentifiedTrade[]): Trade[] {
        return uTrades.map(uTrade => ({
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
            id: ++this.tradeCount,
        }));
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.book.setBase(orderbook);
        this.book.apply();
        this.pushOrderbook();
    }

    protected pushOrderbook(): void {
        this.emit('orderbook', clone(this.book.getBook()));
    }
}

interface Events {
    orderbook: [Orderbook];
    trades: [Trade[]];
    error: [Error];
}

interface Texchange extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

export {
    Texchange,
    Events,
}
