import { Startable, ReadyState } from 'startable';
import assert = require('assert');
import Big from 'big.js';
import { Mutex } from 'coroutine-locks';
import {
    DatabaseTrade,
    StateLike,
    Parsed,
} from '../interfaces';
import { Core } from '../core';

export interface Snapshot {
    latestPrice: Big;
    latestDatabaseTradeId: string;
    userTradeCount: number;
    userOrderCount: number;
}

export class StateMisc extends Startable implements StateLike<Snapshot> {
    public latestPrice?: Big;
    private latestDatabaseTradeId?: string;
    private mutex = new Mutex();
    public userTradeCount = 0;
    public userOrderCount = 0;
    private restored = false;

    constructor(private core: Core) {
        super();
        this.mutex.lock();
    }

    protected async _start() {
        if (!this.restored) await this.mutex.lock();
    }

    protected async _stop() { }

    public updateDatabaseTrade(trade: DatabaseTrade): void {
        this.latestDatabaseTradeId = trade.id;
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }

    public capture(): Snapshot {
        assert(
            this.readyState === ReadyState.STOPPED ||
            this.readyState === ReadyState.STARTED
        );
        return {
            latestPrice: this.latestPrice!,
            latestDatabaseTradeId: this.latestDatabaseTradeId!,
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }

    public restore(snapshot: Parsed<Snapshot>): void {
        assert(
            this.readyState === ReadyState.STOPPED ||
            this.readyState === ReadyState.STARTED
        );
        this.restored = true;
        this.latestPrice = new Big(snapshot.latestPrice);
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
        this.userTradeCount = snapshot.userTradeCount!;
        this.userOrderCount = snapshot.userOrderCount!;
    }
}
