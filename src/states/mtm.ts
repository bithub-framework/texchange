import {
    Trade,
    StateLike,
} from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Mutex } from 'coroutine-locks';

export type Snapshot = Big;

export interface StateMtmLike<Snapshot>
    extends StateLike<Snapshot>, Startable {
    getMarkPrice(): Big;
    updateTrade(trade: Trade): void;
}


export class StateMtm extends Startable implements StateMtmLike<Snapshot> {
    private latestPrice?: Big;
    private mutex = new Mutex();

    constructor(
        snapshot?: Snapshot,
    ) {
        super();
        if (snapshot) this.latestPrice = new Big(snapshot);
        else this.mutex.lock();
    }

    protected async _start() {
        await this.mutex.lock();
    }

    protected async _stop() { }

    public updateTrade(trade: Trade): void {
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }

    public getMarkPrice(): Big {
        return this.latestPrice!;
    }

    public capture(): Snapshot {
        return this.latestPrice!;
    }
}
