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
export type Backup = Stringified<Snapshot>;


export class Progress extends Model<Snapshot> {
    public latestPrice: Big | null = null;
    public latestDatabaseTradeTime: number | null = null;
    public userTradeCount = 0;
    public userOrderCount = 0;

    constructor(
        protected context: Context,
    ) {
        super();
    }

    public updateDatabaseTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
        const now = this.context.timeline.now();

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

export interface DatabaseTrade extends Trade {
    id: string;
}
