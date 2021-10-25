export * from 'interfaces';
import Big from 'big.js';
export interface Frozen {
    balance: {
        [length: number]: Big;
    };
    position: {
        [length: number]: Big;
    };
}
export declare namespace Frozen {
    function plus(x: Frozen, y: Frozen): Frozen;
    const ZERO: Frozen;
    function minus(x: Frozen, y?: Frozen): Frozen;
}
