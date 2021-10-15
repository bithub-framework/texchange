/// <reference types="node" />
import { Length, Frozen, StateLike, TypeRecur } from '../interfaces';
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
    constructor(core: Core, snapshot?: TypeRecur<Snapshot, Big, string>);
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    incMargin(length: Length, increment: Big): void;
    decMargin(length: Length, decrement: Big): void;
    freeze(toFreeze: Frozen): void;
    thaw(toThaw: Frozen): void;
    capture(): Snapshot;
    [inspect.custom](): string;
}
