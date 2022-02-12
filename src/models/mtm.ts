import {
    Trade,
    TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState, StatefulLike } from 'startable';
import { Mutex } from 'coroutine-locks';
import { type Hub } from '../hub';
import assert = require('assert');


export abstract class Mtm<Snapshot>
    implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {

    constructor(
        protected hub: Hub,
        protected markPrice: Big,
    ) { }

    public abstract getSettlementPrice(): Big;
    public abstract updateTrades(trades: Trade[]): void;
    public abstract capture(): Snapshot;
    public abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
}

export class DefaultMtm extends Mtm<Snapshot> {
    public updateTrades(trades: Trade[]): void {
        this.markPrice = trades[trades.length - 1].price;
        this.hub.presenters.clearing.settle();
    }

    public getSettlementPrice(): Big {
        return this.markPrice;
    }

    public capture(): Snapshot {
        return this.markPrice;
    }

    public restore(snapshot: Backup): void {
        this.markPrice = new Big(snapshot);
    }
}

type Snapshot = Big;
type Backup = TypeRecur<Snapshot, Big, string>;
