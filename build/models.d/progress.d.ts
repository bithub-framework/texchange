import { VirtualMachineContextLike } from '../vmctx';
import { HLike } from 'secretary-like';
import { StatefulLike } from '../stateful-like';
import { DatabaseOrderbookId, DatabaseOrderbookLike } from '../data-types/database-orderbook';
import { DatabaseTradeId, DatabaseTradeLike } from '../data-types/database-trade';
export declare class Progress<H extends HLike<H>> implements StatefulLike<Progress.Snapshot> {
    private context;
    userTradeCount: number;
    userOrderCount: number;
    private latestDatabaseTradeId;
    private latestDatabaseOrderbookId;
    constructor(context: VirtualMachineContextLike<H>);
    updateDatabaseTrades(trades: DatabaseTradeLike<H>[]): void;
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    updateDatabaseOrderbook(orderbook: DatabaseOrderbookLike<H>): void;
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
