/// <reference types="node" />
import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
import { Orderbook, Trade, UnidentifiedTrade, Config } from './interfaces';
declare class Pushing extends EventEmitter {
    protected config: Config;
    /** 必须保证 update 时数据的 time 等于 now() */
    protected now: () => number;
    protected tradeCount: number;
    protected bookManager: OrderbookManager;
    constructor(config: Config, 
    /** 必须保证 update 时数据的 time 等于 now() */
    now: () => number);
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    protected pushOrderbook(): Promise<void>;
    protected uTrade2Trade(uTrades: UnidentifiedTrade[]): Trade[];
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
}
interface PushingEvents {
    orderbook: [Orderbook];
    trades: [Trade[]];
    error: [Error];
}
interface Pushing extends EventEmitter {
    on<Event extends keyof PushingEvents>(event: Event, listener: (...args: PushingEvents[Event]) => void): this;
    once<Event extends keyof PushingEvents>(event: Event, listener: (...args: PushingEvents[Event]) => void): this;
    off<Event extends keyof PushingEvents>(event: Event, listener: (...args: PushingEvents[Event]) => void): this;
    emit<Event extends keyof PushingEvents>(event: Event, ...args: PushingEvents[Event]): boolean;
}
export { Pushing as default, Pushing, PushingEvents, };
