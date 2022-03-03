import { Model } from './model';
import Big from 'big.js';
import { DatabaseTrade, TypeRecur } from '../interfaces';
import { Context } from '../context';
interface Snapshot {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Progress extends Model<Snapshot, Backup> {
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
export {};
