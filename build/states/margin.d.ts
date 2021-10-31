import { Length, StateLike, Parsed } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export interface Snapshot {
    [length: number]: Big;
}
export declare class StateMargin implements StateLike<Snapshot> {
    private core;
    [length: number]: Big;
    constructor(core: Core);
    incMargin(length: Length, volume: Big, dollarVolume: Big): void;
    decMargin(length: Length, volume: Big, dollarVolume: Big): void;
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}
