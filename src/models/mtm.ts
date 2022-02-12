import {
    Trade,
    TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState, StatefulLike } from 'startable';
import { Mutex } from 'coroutine-locks';
import { type Hub } from '../hub';
import assert = require('assert');


export interface MtmLike<Snapshot>
    extends StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {
    getSettlementPrice(): Big;
    updateTrades(trades: Trade[]): void;
}

export namespace DefaultMtm {
    export type Snapshot = Big;
    export type Backup = TypeRecur<Snapshot, Big, string>;
}

export import Snapshot = DefaultMtm.Snapshot;
export import Backup = DefaultMtm.Backup;

export class DefaultMtm implements MtmLike<Snapshot> {
    protected markPrice?: Big;
    protected mutex = new Mutex();

    constructor(protected hub: Hub) {
        this.mutex.lock();
    }

    protected async _start() {
        await this.mutex.lock();
    }

    protected async _stop() { }

    public updateTrades(trades: Trade[]): void {
        this.markPrice = trades[trades.length - 1].price;
        this.hub.presenters.clearing.settle();
        this.mutex.unlock();
    }

    public getSettlementPrice(): Big {
        return this.markPrice!;
    }

    public capture(): Snapshot {
        return this.markPrice!;
    }

    public restore(snapshot: Backup): void {
        this.markPrice = new Big(snapshot);
        this.mutex.unlock();
    }
}
