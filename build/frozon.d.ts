export * from 'interfaces';
import Big from 'big.js';
export interface Frozen {
    readonly balance: {
        readonly [length: number]: Big;
    };
    readonly position: {
        readonly [length: number]: Big;
    };
}
export declare namespace Frozen {
    function plus(x: Frozen, y: Frozen): Frozen;
    const ZERO: Frozen;
    function minus(x: Frozen, y?: Frozen): Frozen;
}
