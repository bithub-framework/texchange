import { StatefulLike } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, TypeRecur } from '../interfaces';
import { type Hub } from '../hub';
interface Snapshot {
    latestPrice: Big;
    latestDatabaseTradeId: string;
    userTradeCount: number;
    userOrderCount: number;
}
declare type Backup = TypeRecur<Snapshot, Big, string>;
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
export {};
