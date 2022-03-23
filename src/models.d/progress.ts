import { Context } from '../context';
import {
    Trade,
    H, HLike,
    TexchangeTradeId,
} from 'interfaces';
import { StatefulLike } from 'startable';


export class Progress<H extends HLike<H>>
    implements StatefulLike<Progress.Snapshot> {

    public latestPrice: H | null = null;
    public latestDatabaseTradeTime: number | null = null;
    public userTradeCount = 0;
    public userOrderCount = 0;

    public constructor(
        protected readonly context: Context<H>,
    ) { }

    public updateDatabaseTrades(trades: readonly DatabaseTrade<H>[]): void {
        const now = this.context.timeline.now();

        this.latestDatabaseTradeTime = now;
        this.latestPrice = trades[trades.length - 1].price;
    }

    public capture(): Progress.Snapshot {
        return {
            latestPrice: this.latestPrice
                ? this.context.H.capture(this.latestPrice)
                : null,
            latestDatabaseTradeTime: this.latestDatabaseTradeTime,
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }

    public restore(snapshot: Progress.Snapshot): void {
        this.latestPrice = snapshot.latestPrice === null
            ? null
            : this.context.H.restore(snapshot.latestPrice);
        this.latestDatabaseTradeTime = snapshot.latestDatabaseTradeTime;
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}

export interface DatabaseTrade<H extends HLike<H>> extends Trade<H, TexchangeTradeId> {
    readonly id: string;
}

export namespace Progress {
    export interface Snapshot {
        readonly latestPrice: H.Snapshot | null;
        readonly latestDatabaseTradeTime: number | null;
        readonly userTradeCount: number;
        readonly userOrderCount: number;
    }
}
