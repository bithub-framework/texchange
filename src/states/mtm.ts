import {
    Trade,
    StateLike,
    Parsed,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState } from 'startable';
import { Mutex } from 'coroutine-locks';
import { Core } from '../core';
import assert = require('assert');

export type Snapshot = Big;

export interface StateMtmLike<Snapshot> extends StateLike<Snapshot> {
    getSettlementPrice(): Big;
    updateTrades(trades: Trade[]): void;
}


export class StateMtm extends Startable implements StateMtmLike<Snapshot> {
    protected markPrice?: Big;
    protected mutex = new Mutex();

    constructor(protected core: Core) {
        super();
        this.mutex.lock();
    }

    protected async _start() {
        await this.mutex.lock();
    }

    protected async _stop() { }

    public updateTrades(trades: Trade[]): void {
        this.markPrice = trades[trades.length - 1].price;
        this.core.clearing.settle();
        this.mutex.unlock();
    }

    public getSettlementPrice(): Big {
        assert(this.readyState === ReadyState.STARTED);
        return this.markPrice!;
    }

    public capture(): Snapshot {
        assert(
            this.readyState === ReadyState.STOPPED ||
            this.readyState === ReadyState.STARTED
        );
        return this.markPrice!;
    }

    public restore(snapshot: Parsed<Snapshot>): void {
        assert(
            this.readyState === ReadyState.STOPPED ||
            this.readyState === ReadyState.STARTED
        );
        this.markPrice = new Big(snapshot);
        this.mutex.unlock();
    }
}
