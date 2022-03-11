import { Model } from '../model';
import Big from 'big.js';
import { Context } from '../context';
import { Trade, ReadonlyRecur, JsonCompatible } from 'interfaces';
export declare class Progress extends Model<Progress.Snapshot> {
    protected readonly context: Context;
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
    constructor(context: Context);
    updateDatabaseTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    capture(): Progress.Snapshot;
    restore(snapshot: Progress.Snapshot): void;
}
export interface DatabaseTrade extends Trade {
    id: string;
}
export declare namespace Progress {
    interface SnapshotStruct {
        latestPrice: Big | null;
        latestDatabaseTradeTime: number | null;
        userTradeCount: number;
        userOrderCount: number;
    }
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
    export {};
}
