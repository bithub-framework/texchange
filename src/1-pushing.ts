import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
import {
    Orderbook,
    Trade,
    UnidentifiedTrade,
    Config,
    clone,
} from './interfaces';

class Texchange extends EventEmitter {
    protected tradeCount = 0;
    protected bookManager: OrderbookManager;

    constructor(
        protected config: Config,
        /** 必须保证 update 时数据的 time 等于 now() */
        protected now: () => number,
    ) {
        super();
        this.bookManager = new OrderbookManager(config, now);
    }

    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
    }

    protected async pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void> {
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
        this.bookManager.setBase(orderbook);
        this.bookManager.apply();
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }

    protected async pushOrderbook(): Promise<void> {
        this.emit('orderbook', clone(this.bookManager.getBook()));
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
