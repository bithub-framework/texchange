import { Startable } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, StateLike, Parsed } from '../interfaces';
import { Core } from '../core';
export interface Snapshot {
    latestPrice: Big;
    latestDatabaseTradeId: string;
    userTradeCount: number;
    userOrderCount: number;
}
export declare class StateMisc extends Startable implements StateLike<Snapshot> {
    private core;
    latestPrice?: Big;
    private latestDatabaseTradeId?;
    private mutex;
    userTradeCount: number;
    userOrderCount: number;
    private restored;
    constructor(core: Core);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateDatabaseTrade(trade: DatabaseTrade): void;
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}
