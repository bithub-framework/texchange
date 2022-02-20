import { ModelLike } from './model';
import Big from 'big.js';
import {
    DatabaseTrade,
    TypeRecur,
} from '../interfaces';
import { Context } from '../context';


interface Snapshot {
    latestPrice: Big | null;
    latestDatabaseTradeTime: number | null;
    userTradeCount: number;
    userOrderCount: number;
}
type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;


export class Progress implements ModelLike<Snapshot, Backup, boolean> {
    public stage?: boolean;
    public latestPrice: Big | null = null;
    public latestDatabaseTradeTime: number | null = null;
    public userTradeCount = 0;
    public userOrderCount = 0;

    constructor(
        private context: Context,
    ) { }

    public initializeStage(): void {
        this.stage = false;
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
