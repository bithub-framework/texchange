import { Startable } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, StateLike } from '../interfaces';
export interface Snapshot {
    latestPrice: Big;
    latestDatabaseTradeId: string;
    userTradeCount: number;
    userOrderCount: number;
}
export declare class StateMisc extends Startable implements StateLike<Snapshot> {
    latestPrice?: Big;
    private latestDatabaseTradeId?;
    private mutex;
    userTradeCount: number;
    userOrderCount: number;
    constructor(snapshotString?: string);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateDatabaseTrade(trade: DatabaseTrade): void;
    capture(): Snapshot;
}
