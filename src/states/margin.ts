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
    frozen: {
        balance: {
            [length: number]: Big;
        };
        position: {
            [length: number]: Big;
        };
    };
}


export class StateMargin implements StateLike<Snapshot> {
    [length: number]: Big;
    public frozen: Frozen;

    constructor(
        private core: Core,
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        if (snapshot) {
            this.frozen = {
                balance: {
                    [Length.LONG]: new Big(snapshot.frozen.balance[Length.LONG]),
                    [Length.SHORT]: new Big(snapshot.frozen.balance[Length.SHORT]),
                },
                position: {
                    [Length.LONG]: new Big(snapshot.frozen.position[Length.LONG]),
                    [Length.SHORT]: new Big(snapshot.frozen.position[Length.SHORT]),
                },
            };
            this[Length.LONG] = new Big(snapshot[Length.LONG]);
            this[Length.SHORT] = new Big(snapshot[Length.SHORT]);
        } else {
            this.frozen = {
                balance: {
                    [Length.LONG]: new Big(0),
                    [Length.SHORT]: new Big(0),
                },
                position: {
                    [Length.LONG]: new Big(0),
                    [Length.SHORT]: new Big(0),
                },
            }
            this[Length.LONG] = new Big(0);
            this[Length.SHORT] = new Big(0);
        }
    }

    public get available(): Big {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.core.calculation.totalFrozenBalance());
    }

    public get closable() {
        return {
            [Length.LONG]: this.core.states.assets.position[Length.LONG]
                .minus(this.frozen.position[Length.LONG]),
            [Length.SHORT]: this.core.states.assets.position[Length.SHORT]
                .minus(this.frozen.position[Length.SHORT]),
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
        this.frozen = Frozen.plus(this.frozen, toFreeze);
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
        this.frozen = Frozen.minus(this.frozen, toThaw);
        if (
            this.frozen.balance[Length.LONG].lt(0) ||
            this.frozen.balance[Length.SHORT].lt(0) ||
            this.frozen.position[Length.LONG].lt(0) ||
            this.frozen.position[Length.SHORT].lt(0)
        ) {
            this.freeze(toThaw);
            throw new Error('No enough to thaw');
        }
    }

    public capture(): Snapshot {
        return {
            frozen: {
                position: {
                    [Length.LONG]: this.frozen.position[Length.LONG],
                    [Length.SHORT]: this.frozen.position[Length.SHORT],
                },
                balance: {
                    [Length.LONG]: this.frozen.balance[Length.LONG],
                    [Length.SHORT]: this.frozen.balance[Length.SHORT],
                },
            },
            [Length.LONG]: this[Length.LONG],
            [Length.SHORT]: this[Length.SHORT],
        };
    }

    public [inspect.custom]() {
        return JSON.stringify({
            [Length.LONG]: this[Length.LONG],
            [Length.SHORT]: this[Length.SHORT],
            frozen: {
                position: {
                    [Length.LONG]: this.frozen.position[Length.LONG],
                    [Length.SHORT]: this.frozen.position[Length.SHORT],
                },
                balance: {
                    [Length.LONG]: this.frozen.balance[Length.LONG],
                    [Length.SHORT]: this.frozen.balance[Length.SHORT],
                },
            },
            available: this.available,
            closable: this.closable,
        });
    }
}
