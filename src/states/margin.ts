import {
    Length,
    Frozen,
    StateLike,
} from '../interfaces';
import Big from 'big.js';
import { inspect } from 'util';
import { Core } from '../core';


export interface Snapshot {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: {
        [length: number]: Big;
    };
}


export class StateMargin implements StateLike<Snapshot> {
    public positionMargin: {
        [length: number]: Big;
    };
    public frozenBalance: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        private core: Core,
        snapshot: Snapshot,
    ) {
        this.frozenBalance = snapshot.frozenBalance;
        this.frozenPosition = {
            [Length.LONG]: snapshot.frozenPosition[Length.LONG],
            [Length.SHORT]: snapshot.frozenPosition[Length.SHORT],
        };
        this.positionMargin = {
            [Length.LONG]: snapshot.positionMargin[Length.LONG],
            [Length.SHORT]: snapshot.positionMargin[Length.SHORT],
        };
    }

    public incPositionMargin(
        length: Length,
        increment: Big,
    ) {
        this.positionMargin[length] = this.positionMargin[length].plus(increment);
    }

    public decPositionMargin(
        length: Length,
        decrement: Big,
    ) {
        this.positionMargin[length] = this.positionMargin[length].minus(decrement);
    }

    public setPositionMargin(
        length: Length,
        positionMargin: Big,
    ) {
        this.positionMargin[length] = positionMargin;
    }

    public get available(): Big {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalPositionMargin())
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

    public freeze(frozen: Frozen) {
        this.frozenBalance = this.frozenBalance.plus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].plus(frozen.position);
        if (this.available.lt(0) || this.closable[frozen.length].lt(0)) {
            this.thaw(frozen);
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
            positionMargin: this.positionMargin,
        };
    }

    public [inspect.custom]() {
        return JSON.stringify({
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
            positionMargin: this.positionMargin,
        });
    }
}
