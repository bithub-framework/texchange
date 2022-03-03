import { Model } from './model';
import Big from 'big.js';
import { Context } from '../context';
import { Stringified } from './model';
import { Trade } from 'interfaces';
export interface Snapshot {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
export declare type Backup = Stringified<Snapshot>;
export declare class Progress extends Model<Snapshot> {
    protected context: Context;
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
    constructor(context: Context);
    updateDatabaseTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
export interface DatabaseTrade extends Trade {
    id: string;
}
