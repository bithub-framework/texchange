import { StatefulLike } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, TypeRecur } from '../interfaces';
import { Context } from '../context/context';
interface Snapshot {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Progress implements StatefulLike<Snapshot, Backup> {
    private context;
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
