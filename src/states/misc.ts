import { Startable } from 'startable';
import Big from 'big.js';
import { Mutex } from 'coroutine-locks';
import {
    DatabaseTrade,
    StateLike,
    TypeRecur,
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

    constructor(
        private core: Core,
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        super();
        if (snapshot) {
            this.latestPrice = new Big(snapshot.latestPrice);
            this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
            this.userTradeCount = snapshot.userTradeCount;
            this.userOrderCount = snapshot.userOrderCount;
        } else this.mutex.lock();
    }

    protected async _start() {
        await this.mutex.lock();
    }

    protected async _stop() { }

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
            userOrderCount: this.userOrderCount,
        };
    }
}
