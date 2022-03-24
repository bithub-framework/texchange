import { Context } from '../context/context';
import {
    Trade,
    H, HLike,
    TexchangeTradeId,
} from 'interfaces';
import { StatefulLike } from 'startable';


export class Progress<H extends HLike<H>>
    implements StatefulLike<Progress.Snapshot> {

    // public latestPrice: H | null = null;
    // public latestDatabaseTradeTime: number | null = null;
    public userTradeCount = 0;
    public userOrderCount = 0;

    public constructor(
        private readonly context: Context<H>,
    ) { }

    public updateDatabaseTrades(trades: readonly DatabaseTrade<H>[]): void {
        const now = this.context.timeline.now();

        // this.latestDatabaseTradeTime = now;
        // this.latestPrice = trades[trades.length - 1].price;
    }

    public capture(): Progress.Snapshot {
        return {
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }

    public restore(snapshot: Progress.Snapshot): void {
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}

export interface DatabaseTrade<H extends HLike<H>>
    extends Trade<H, TexchangeTradeId> {

    readonly id: string;
}

export namespace Progress {
    export interface Snapshot {
        readonly userTradeCount: number;
        readonly userOrderCount: number;
    }
}
