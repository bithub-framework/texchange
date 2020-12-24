/// <reference types="node" />
import { EventEmitter } from 'events';
import { OrderbookManager } from './orderbook-manager';
import { Orderbook, Trade, RawTrade, Config } from './interfaces';
declare class Pushing extends EventEmitter {
    protected config: Config;
    protected now: () => number;
    protected tradeCount: number;
    protected orderbook: OrderbookManager;
    constructor(config: Config, now: () => number);
    updateTrades(rawTrades: RawTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    protected pushOrderbook(): Promise<void>;
    protected rawTrade2Trade(rawTrades: RawTrade[]): Trade[];
    protected pushRawTrades(rawTrades: RawTrade[]): Promise<void>;
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
export { Pushing as default, Pushing, };
