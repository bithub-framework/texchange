import {
    Length,
    Frozen,
    StateLike,
    TypeRecur,
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
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        if (snapshot) {
            this.frozenBalance = new Big(snapshot.frozenBalance);
            this.frozenPosition = {
                [Length.LONG]: new Big(snapshot.frozenPosition[Length.LONG]),
                [Length.SHORT]: new Big(snapshot.frozenPosition[Length.SHORT]),
            };
            this[Length.LONG] = new Big(snapshot[Length.LONG]);
            this[Length.SHORT] = new Big(snapshot[Length.SHORT]);
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

    public incMargin(length: Length, increment: Big): void {
        if (increment.lt(0))
            this.decMargin(length, new Big(0).minus(increment))
        else
            this[length] = this[length].plus(increment);
    }

    public decMargin(length: Length, decrement: Big): void {
        if (decrement.lt(0))
            this.incMargin(length, new Big(0).minus(decrement));
        else if (decrement.lte(this[length]))
            this[length] = this[length].minus(decrement);
        else {
            const rest = decrement.minus(this[length]);
            this[length] = new Big(0);
            this.incMargin(-length, rest);
        }
    }

    public freeze(toFreeze: Frozen) {
        this.frozenBalance = this.frozenBalance.plus(toFreeze.balance);
        this.frozenPosition[Length.LONG] = this.frozenPosition[Length.LONG].plus(toFreeze.position[Length.LONG]);
        this.frozenPosition[Length.SHORT] = this.frozenPosition[Length.SHORT].plus(toFreeze.position[Length.SHORT]);
        if (
            this.available.lt(0) ||
            this.closable[Length.LONG].lt(0) ||
            this.closable[Length.SHORT].lt(0)
        ) {
            this.thaw(toFreeze);
            throw new Error('No enough to freeze');
        }
    }

    public thaw(toThaw: Frozen) {
        this.frozenBalance = this.frozenBalance.minus(toThaw.balance);
        this.frozenPosition[Length.LONG] = this.frozenPosition[Length.LONG].minus(toThaw.position[Length.LONG]);
        this.frozenPosition[Length.SHORT] = this.frozenPosition[Length.SHORT].minus(toThaw.position[Length.SHORT]);
        if (
            this.frozenBalance.lt(0) ||
            this.frozenPosition[Length.LONG].lt(0) ||
            this.frozenPosition[Length.SHORT].lt(0)
        ) {
            this.freeze(toThaw);
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
