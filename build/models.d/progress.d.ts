import { Context } from '../context';
import { HLike } from 'secretary-like';
import { StatefulLike } from '../stateful-like';
import { DatabaseOrderbookId, DatabaseOrderbook } from '../data-types/database-orderbook';
import { DatabaseTradeId, DatabaseTrade } from '../data-types/database-trade';
export declare class Progress<H extends HLike<H>> implements StatefulLike<Progress.Snapshot> {
    private context;
    userTradeCount: number;
    userOrderCount: number;
    private latestDatabaseTradeId;
    private latestDatabaseOrderbookId;
    constructor(context: Context<H>);
    updateDatabaseTrades(trades: DatabaseTrade<H>[]): void;
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    updateDatabaseOrderbook(orderbook: DatabaseOrderbook<H>): void;
    getLatestDatabaseTradeId(): DatabaseTradeId | null;
    capture(): Progress.Snapshot;
    restore(snapshot: Progress.Snapshot): void;
}
export declare namespace Progress {
    interface Snapshot {
        userTradeCount: number;
        userOrderCount: number;
        latestDatabaseTradeId: string | null;
        latestDatabaseOrderbookId: string | null;
    }
}
