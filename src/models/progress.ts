import { Startable, ReadyState, StatefulLike } from 'startable';
import assert = require('assert');
import Big from 'big.js';
import { Mutex } from 'coroutine-locks';
import {
    DatabaseTrade,
    TypeRecur,
} from '../interfaces';
import { type Hub } from '../hub';

export namespace Progress {
    export interface Snapshot {
        latestPrice: Big;
        latestDatabaseTradeId: string;
        userTradeCount: number;
        // userOrderCount: number;
    }

    export type Backup = TypeRecur<Snapshot, Big, string>;
}

export import Snapshot = Progress.Snapshot;
export import Backup = Progress.Backup;


// TODO initial state
export class Progress implements StatefulLike<Snapshot, Backup> {
    public latestPrice?: Big;
    private latestDatabaseTradeId?: string;
    private mutex = new Mutex();
    public userTradeCount = 0;
    // public userOrderCount = 0;

    constructor(private hub: Hub) { }

    protected async StatefulStartable$start() {
        await this.mutex.lock();
    }

    protected async StatefulStartable$stop() { }

    public updateDatabaseTrade(trade: DatabaseTrade): void {
        this.latestDatabaseTradeId = trade.id;
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }

    public capture(): Snapshot {
        return {
            latestPrice: this.latestPrice!,
            latestDatabaseTradeId: this.latestDatabaseTradeId!,
            userTradeCount: this.userTradeCount,
            // userOrderCount: this.userOrderCount,
        };
    }

    public restore(snapshot: Backup): void {
        this.latestPrice = new Big(snapshot.latestPrice);
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
        this.userTradeCount = snapshot.userTradeCount!;
        // this.userOrderCount = snapshot.userOrderCount!;
    }
}
