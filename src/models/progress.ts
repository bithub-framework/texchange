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
type Backup = TypeRecur<Snapshot, Big, string>;


export class Progress implements StatefulLike<Snapshot, Backup> {
    private latestPrice: Big | null = null;
    private latestDatabaseTradeTime: number | null = null;
    private userTradeCount = 0;
    private userOrderCount = 0;

    constructor(private hub: Hub) { }

    public getUserTradeCount() {
        return this.userTradeCount;
    }

    public getUserOrderCount() {
        return this.userOrderCount;
    }

    public incUserOrderCount() {
        return ++this.userOrderCount;
    }

    public incUserTradeCount() {
        return ++this.userTradeCount;
    }

    public getLatestDatabaseTradeTime(): number | null {
        return this.latestDatabaseTradeTime;
    }

    public getLatestPrice(): Big | null {
        return this.latestPrice;
    }

    public updateDatabaseTrades(trades: DatabaseTrade[]): void {
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
