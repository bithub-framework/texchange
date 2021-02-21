/// <reference types="node" />
import { EventEmitter } from 'events';
import { OrderbookManager } from './manager-orderbook';
import { Orderbook, Trade, UnidentifiedTrade, Config } from './interfaces';
declare abstract class Pushing extends EventEmitter {
    protected config: Config;
    protected now: () => number;
    protected tradeCount: number;
    protected orderbook: OrderbookManager;
    constructor(config: Config, now: () => number);
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    protected pushOrderbook(): Promise<void>;
    protected uTrade2Trade(uTrades: UnidentifiedTrade[]): Trade[];
    protected pushUTrades(noidTrades: UnidentifiedTrade[]): Promise<void>;
}
declare type PushingEvents = {
    orderbook: [Orderbook];
    trades: [Trade[]];
    error: [Error];
};
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
export { Pushing as default, Pushing, PushingEvents, };
