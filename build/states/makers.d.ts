import { OrderId, OpenMaker, Frozen, StateLike, Parsed } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
export declare class StateMakers extends Map<OrderId, OpenMaker> implements StateLike<Snapshot> {
    private core;
    private frozens;
    unfilledSum: {
        [side: number]: Big;
    };
    frozenSum: Frozen;
    constructor(core: Core);
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
    private normalizeFrozen;
    appendOrder(order: OpenMaker): void;
    takeOrder(oid: OrderId, volume: Big): void;
    removeOrder(oid: OrderId): void;
}
