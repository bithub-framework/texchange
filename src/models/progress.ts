import { Startable, ReadyState, StatefulLike } from 'startable';
import assert = require('assert');
import Big from 'big.js';
import { Mutex } from 'coroutine-locks';
import {
    DatabaseTrade,
    TypeRecur,
} from '../interfaces';
import { type Hub } from '../hub';

interface Snapshot {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;


export class Progress implements StatefulLike<Snapshot, Backup> {
    public latestPrice: Big | null = null;
    public latestDatabaseTradeTime: number | null = null;
    public userTradeCount = 0;
    public userOrderCount = 0;

    constructor(private hub: Hub) { }

    public updateDatabaseTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
        const now = this.hub.context.timeline.now();

        this.latestDatabaseTradeTime = now;
        this.latestPrice = trades[trades.length - 1].price;
    }

    public capture(): Snapshot {
        return {
            latestPrice: this.latestPrice!,
            latestDatabaseTradeTime: this.latestDatabaseTradeTime,
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }

    public restore(snapshot: Backup): void {
        this.latestPrice = snapshot.latestPrice === null
            ? null
            : new Big(snapshot.latestPrice);
        this.latestDatabaseTradeTime = snapshot.latestDatabaseTradeTime;
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}
