/// <reference types="node" />
import { EventEmitter } from 'events';
import { OrderbookManager } from './orderbook-manager';
import { Orderbook, Trade, RawTrade, Config } from './interfaces';
declare class Pushing extends EventEmitter {
    protected config: Config;
    protected now: () => number;
    protected tradeCount: number;
    protected orderbookManager: OrderbookManager;
    constructor(config: Config, now: () => number);
    updateTrades(rawTrades: RawTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    protected pushOrderbook(): Promise<void>;
    protected rawTrade2Trade(rawTrades: RawTrade[]): Trade[];
    protected pushRawTrades(rawTrades: RawTrade[]): Promise<void>;
}
export { Pushing as default, Pushing, };
