/// <reference types="node" />
import { EventEmitter } from 'events';
import { OrderbookManager } from './state-managers/orderbook-manager';
import { Orderbook, Trade, UnidentifiedTrade, Config } from './interfaces';
declare abstract class Texchange extends EventEmitter {
    protected config: Config;
    protected now: () => number;
    protected tradeCount: number;
    protected book: OrderbookManager;
    constructor(config: Config, now: () => number);
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    protected pushUTrades(uTrades: UnidentifiedTrade[]): void;
    protected uTrade2Trade(uTrades: UnidentifiedTrade[]): Trade[];
    updateOrderbook(orderbook: Orderbook): void;
    protected pushOrderbook(): void;
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
export { Texchange, Events, };
