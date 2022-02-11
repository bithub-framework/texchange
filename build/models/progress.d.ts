import { StatefulLike } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, TypeRecur } from '../interfaces';
import { type Hub } from '../hub';
export declare namespace Progress {
    interface Snapshot {
        latestPrice: Big;
        latestDatabaseTradeId: string;
        userTradeCount: number;
        userOrderCount: number;
    }
    type Backup = TypeRecur<Snapshot, Big, string>;
}
export import Snapshot = Progress.Snapshot;
export import Backup = Progress.Backup;
export declare class Progress implements StatefulLike<Snapshot, Backup> {
    private hub;
    latestPrice?: Big;
    private latestDatabaseTradeId?;
    private mutex;
    userTradeCount: number;
    userOrderCount: number;
    constructor(hub: Hub);
    protected StatefulStartable$start(): Promise<void>;
    protected StatefulStartable$stop(): Promise<void>;
    updateDatabaseTrade(trade: DatabaseTrade): void;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
