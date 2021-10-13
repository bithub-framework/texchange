/// <reference types="node" />
import { Length, StateLike } from '../interfaces';
import { inspect } from 'util';
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
export declare function makeEmptyAssetsSnapshot(balance: Big): Snapshot;
export declare class StateAssets implements StateLike<Snapshot> {
    private core;
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    constructor(core: Core, snapshot?: Snapshot);
    capture(): Snapshot;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): Big;
    [inspect.custom](): string;
}
