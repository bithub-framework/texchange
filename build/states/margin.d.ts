/// <reference types="node" />
import { Frozen, StateLike } from '../interfaces';
import Big from 'big.js';
import { inspect } from 'util';
import { Core } from '../core';
export interface Snapshot {
    [length: number]: Big;
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
}
export declare class StateMargin implements StateLike<Snapshot> {
    private core;
    [length: number]: Big;
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    constructor(core: Core, snapshot?: Snapshot);
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    freeze(toFreeze: Frozen): void;
    thaw(frozen: Frozen): void;
    capture(): Snapshot;
    [inspect.custom](): string;
}
