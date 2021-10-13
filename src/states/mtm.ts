import {
    Trade,
    Orderbook,
    StateLike,
} from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Mutex } from 'coroutine-locks';
import { Core } from '../core';

export type Snapshot = Big;

export interface StateMtmLike<Snapshot>
    extends StateLike<Snapshot>, Startable {
    getSettlementPrice(): Big;
    updateTrades(trades: Trade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
}


export class StateMtm extends Startable implements StateMtmLike<Snapshot> {
    protected markPrice?: Big;
    protected mutex = new Mutex();

    constructor(
        protected core: Core,
        snapshot?: Snapshot,
    ) {
        super();
        if (snapshot) this.markPrice = new Big(snapshot);
        else this.mutex.lock();
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

    public updateOrderbook(orderbook: Orderbook) { }

    public getSettlementPrice(): Big {
        return this.markPrice!;
    }

    public capture(): Snapshot {
        return this.markPrice!;
    }
}
