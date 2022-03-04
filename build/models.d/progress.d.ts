import { Model } from './model';
import Big from 'big.js';
import { Context } from '../context';
import { Trade, ReadonlyRecur, JsonCompatible } from 'interfaces';
export declare class Progress extends Model<Snapshot> {
    protected context: Context;
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
    constructor(context: Context);
    updateDatabaseTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
}
export interface DatabaseTrade extends Trade {
    id: string;
}
interface SnapshotStruct {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
export declare namespace Progress {
    type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = Progress.Snapshot;
export {};
