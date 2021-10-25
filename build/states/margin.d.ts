import { Length, Frozen, StateLike, Closable, Parsed } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export interface Snapshot {
    [length: number]: Big;
}
export declare class StateMargin implements StateLike<Snapshot> {
    private core;
    [length: number]: Big;
    constructor(core: Core);
    get frozen(): Frozen;
    get available(): Big;
    get closable(): Closable;
    incMargin(length: Length, volume: Big, dollarVolume: Big): void;
    decMargin(length: Length, volume: Big, dollarVolume: Big): void;
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}
