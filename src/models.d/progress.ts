import { VirtualMachineContextLike } from '../vmctx';
import { HLike } from 'secretary-like';
import { StatefulLike } from '../stateful-like';
import { DatabaseOrderbookId, DatabaseOrderbook } from '../data-types/database-orderbook';
import { DatabaseTradeId, DatabaseTrade } from '../data-types/database-trade';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class Progress<H extends HLike<H>>
    implements StatefulLike<Progress.Snapshot> {

    public userTradeCount = 0;
    public userOrderCount = 0;
    private latestDatabaseTradeId: DatabaseTradeId | null = null;
    private latestDatabaseOrderbookId: DatabaseOrderbookId | null = null;

    public constructor(
        @inject(TYPES.vmctx)
        private context: VirtualMachineContextLike<H>,
    ) { }

    public updateDatabaseTrades(trades: DatabaseTrade<H>[]): void {
        this.latestDatabaseTradeId = trades[trades.length - 1].id;
    }

    public getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null {
        return this.latestDatabaseOrderbookId;
    }

    public updateDatabaseOrderbook(orderbook: DatabaseOrderbook<H>): void {
        this.latestDatabaseOrderbookId = orderbook.id;
    }

    public getLatestDatabaseTradeId(): DatabaseTradeId | null {
        return this.latestDatabaseTradeId;
    }

    public capture(): Progress.Snapshot {
        return {
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
            latestDatabaseOrderbookId: this.latestDatabaseOrderbookId,
            latestDatabaseTradeId: this.latestDatabaseTradeId,
        };
    }

    public restore(snapshot: Progress.Snapshot): void {
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
        this.latestDatabaseOrderbookId = snapshot.latestDatabaseOrderbookId;
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
    }
}

export namespace Progress {
    export interface Snapshot {
        userTradeCount: number;
        userOrderCount: number;
        latestDatabaseTradeId: string | null;
        latestDatabaseOrderbookId: string | null;
    }
}
