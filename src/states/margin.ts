import {
    Length,
    Frozen,
    StateLike,
} from '../interfaces';
import Big from 'big.js';
import { inspect } from 'util';
import { Core } from '../core';


export interface Snapshot {
    [length: number]: Big;
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
}


export class StateMargin implements StateLike<Snapshot> {
    [length: number]: Big;
    public frozenBalance: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        private core: Core,
        snapshot?: Snapshot,
    ) {
        if (snapshot) {
            this.frozenBalance = snapshot.frozenBalance;
            this.frozenPosition = {
                [Length.LONG]: snapshot.frozenPosition[Length.LONG],
                [Length.SHORT]: snapshot.frozenPosition[Length.SHORT],
            };
            this[Length.LONG] = snapshot[Length.LONG];
            this[Length.SHORT] = snapshot[Length.SHORT];
        } else {
            this.frozenBalance = new Big(0);
            this.frozenPosition = {
                [Length.LONG]: new Big(0),
                [Length.SHORT]: new Big(0),
            };
            this[Length.LONG] = new Big(0);
            this[Length.SHORT] = new Big(0);
        }
    }

    public get available(): Big {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.frozenBalance);

    }

    public get closable() {
        return {
            [Length.LONG]: this.core.states.assets.position[Length.LONG]
                .minus(this.frozenPosition[Length.LONG]),
            [Length.SHORT]: this.core.states.assets.position[Length.SHORT]
                .minus(this.frozenPosition[Length.SHORT]),
        };
    }

    public freeze(toFreeze: Frozen) {
        this.frozenBalance = this.frozenBalance.plus(toFreeze.balance);
        this.frozenPosition[toFreeze.length] = this.frozenPosition[toFreeze.length].plus(toFreeze.position);
        if (this.available.lt(0) || this.closable[toFreeze.length].lt(0)) {
            this.thaw(toFreeze);
            throw new Error('No enough to freeze');
        }
    }

    public thaw(frozen: Frozen) {
        this.frozenBalance = this.frozenBalance.minus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].minus(frozen.position);
        if (this.frozenBalance.lt(0) || this.frozenPosition[frozen.length].lt(0)) {
            this.freeze(frozen);
            throw new Error('No enough to thaw');
        }
    }

    public capture(): Snapshot {
        return {
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            [Length.LONG]: this[Length.LONG],
            [Length.SHORT]: this[Length.SHORT],
        };
    }

    public [inspect.custom]() {
        return JSON.stringify({
            [Length.LONG]: this[Length.LONG],
            [Length.SHORT]: this[Length.SHORT],
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
        });
    }
}
