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

    public updateOrderbook(orderbook: Orderbook): void {
        this.bookManager.setBase(orderbook);
        this.bookManager.apply();
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }

    protected async pushOrderbook(): Promise<void> {
        this.emit('orderbook', this.bookManager);
    }

    protected uTrade2Trade(uTrades: UnidentifiedTrade[]): Trade[] {
        return uTrades.map(noidTrade => ({
            ...noidTrade,
            id: ++this.tradeCount,
        }));
    }

    protected async pushUTrades(noidTrades: UnidentifiedTrade[]): Promise<void> {
        const trades = this.uTrade2Trade(noidTrades);
        this.emit('trades', trades);
    }
}

type PushingEvents = {
    orderbook: [Orderbook];
    trades: [Trade[]];
    error: [Error];
}

interface Pushing extends EventEmitter {
    on<Event extends keyof PushingEvents>(event: Event, listener: (...args: PushingEvents[Event]) => void): this;
    once<Event extends keyof PushingEvents>(event: Event, listener: (...args: PushingEvents[Event]) => void): this;
    off<Event extends keyof PushingEvents>(event: Event, listener: (...args: PushingEvents[Event]) => void): this;
    emit<Event extends keyof PushingEvents>(event: Event, ...args: PushingEvents[Event]): boolean;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: string | symbol, ...args: any[]): boolean;
}

export {
    Pushing as default,
    Pushing,
    PushingEvents,
}
