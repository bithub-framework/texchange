import { Length, StateLike, Parsed } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export interface Snapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}
export declare class StateAssets implements StateLike<Snapshot> {
    private core;
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    constructor(core: Core);
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
    payFee(fee: Big): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big): void;
    /**
     * @returns Profit.
     */
    closePosition(length: Length, volume: Big, dollarVolume: Big): Big;
}
