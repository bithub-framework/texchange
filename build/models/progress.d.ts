import { StatefulLike } from 'startable';
import Big from 'big.js';
import { DatabaseTrade, TypeRecur } from '../interfaces';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context'> {
}
interface Snapshot {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Progress implements StatefulLike<Snapshot, Backup> {
    private hub;
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
    constructor(hub: Deps);
    updateDatabaseTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
export {};
