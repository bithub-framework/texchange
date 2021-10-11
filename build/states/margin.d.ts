/// <reference types="node" />
import { Length, Frozen, StateLike } from '../interfaces';
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
export declare class StateMargin implements StateLike<Snapshot> {
    private core;
    positionMargin: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    constructor(core: Core, snapshot: Snapshot);
    incPositionMargin(length: Length, increment: Big): void;
    decPositionMargin(length: Length, decrement: Big): void;
    setPositionMargin(length: Length, positionMargin: Big): void;
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    freeze(frozen: Frozen): void;
    thaw(frozen: Frozen): void;
    capture(): Snapshot;
    [inspect.custom](): string;
}
