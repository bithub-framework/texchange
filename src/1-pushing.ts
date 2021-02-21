import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
import {
    Orderbook,
    Trade,
    UnidentifiedTrade,
    Config,
} from './interfaces';

abstract class Pushing extends EventEmitter {
    protected tradeCount = 0;
    protected orderbook: OrderbookManager;

    constructor(
        protected config: Config,
        /** 必须保证 update 时数据的 time 等于 now() */
        protected now: () => number,
    ) {
        super();
        this.orderbook = new OrderbookManager(config, now);
    }

    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.orderbook.setBase(orderbook);
        this.orderbook.apply();
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }

    protected async pushOrderbook(): Promise<void> {
        this.emit('orderbook', this.orderbook);
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

export {
    Pushing as default,
    Pushing,
    PushingEvents,
}
