import { Startable } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, StateLike, TypeRecur } from '../interfaces';
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
    constructor(core: Core, snapshot?: TypeRecur<Snapshot, Big, string>);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateDatabaseTrade(trade: DatabaseTrade): void;
    capture(): Snapshot;
}
