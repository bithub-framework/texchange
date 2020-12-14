/// <reference types="node" />
import { EventEmitter } from 'events';
import { IncrementalBook } from './incremental-book';
import { Orderbook, Trade, RawTrade } from './interfaces';
declare class Pushing extends EventEmitter {
    protected now: () => number;
    protected tradeCount: number;
    protected incBook: IncrementalBook;
    constructor(now: () => number);
    updateTrades(rawTrades: RawTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    protected latestOrderbook(): Orderbook;
    protected pushOrderbook(): Promise<void>;
    protected rawTrade2Trade(rawTrades: RawTrade[]): Trade[];
    protected pushRawTrades(rawTrades: RawTrade[]): Promise<void>;
}
export { Pushing as default, Pushing, };
