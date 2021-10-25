export * from 'interfaces';
import {
    Length,
} from 'interfaces';
import Big from 'big.js';

export interface Frozen {
    balance: {
        [length: number]: Big;
    };
    position: {
        [length: number]: Big;
    };
}

export namespace Frozen {
    export function plus(x: Frozen, y: Frozen): Frozen {
        return {
            balance: {
                [Length.LONG]: x.balance[Length.LONG].plus(y.balance[Length.LONG]),
                [Length.SHORT]: x.balance[Length.SHORT].plus(y.balance[Length.SHORT]),
            },
            position: {
                [Length.LONG]: x.position[Length.LONG].plus(y.position[Length.LONG]),
                [Length.SHORT]: x.position[Length.SHORT].plus(y.position[Length.SHORT]),
            },
        }
    }
    export const ZERO: Frozen = {
        balance: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        position: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
    };
    export function minus(x: Frozen, y?: Frozen): Frozen {
        if (!y) {
            y = x;
            x = {
                balance: {
                    [Length.LONG]: new Big(0),
                    [Length.SHORT]: new Big(0),
                },
                position: {
                    [Length.LONG]: new Big(0),
                    [Length.SHORT]: new Big(0),
                },
            };
        }
        return {
            balance: {
                [Length.LONG]: x.balance[Length.LONG].minus(y.balance[Length.LONG]),
                [Length.SHORT]: x.balance[Length.SHORT].minus(y.balance[Length.SHORT]),
            },
            position: {
                [Length.LONG]: x.position[Length.LONG].minus(y.position[Length.LONG]),
                [Length.SHORT]: x.position[Length.SHORT].minus(y.position[Length.SHORT]),
            },
        }
    }
}
