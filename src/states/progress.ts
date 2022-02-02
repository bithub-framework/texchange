import { Startable, ReadyState } from 'startable';
import assert = require('assert');
import Big from 'big.js';
import { Mutex } from 'coroutine-locks';
import {
    DatabaseTrade,
    Parsed,
} from '../interfaces';
import { Hub } from '../hub';
import { StatefulStartable } from '../stateful-startable';

export interface Snapshot {
    latestPrice: Big;
    latestDatabaseTradeId: string;
    userTradeCount: number;
    // userOrderCount: number;
}

export class Progress extends StatefulStartable<Snapshot, Parsed<Snapshot>> {
    public latestPrice?: Big;
    private latestDatabaseTradeId?: string;
    private mutex = new Mutex();
    public userTradeCount = 0;
    // public userOrderCount = 0;

    constructor(private hub: Hub) {
        super();
        this.mutex.lock();
    }

    protected async StatefulStartable$start() {
        await this.mutex.lock();
    }

    protected async StatefulStartable$stop() { }

    public updateDatabaseTrade(trade: DatabaseTrade): void {
        this.latestDatabaseTradeId = trade.id;
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }

    protected StatefulStartable$capture(): Snapshot {
        return {
            latestPrice: this.latestPrice!,
            latestDatabaseTradeId: this.latestDatabaseTradeId!,
            userTradeCount: this.userTradeCount,
            // userOrderCount: this.userOrderCount,
        };
    }

    protected StatefulStartable$restore(snapshot: Parsed<Snapshot>): void {
        this.latestPrice = new Big(snapshot.latestPrice);
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
        this.userTradeCount = snapshot.userTradeCount!;
        // this.userOrderCount = snapshot.userOrderCount!;
    }
}
