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
    totalUnfilled: {
        [side: number]: Big;
    };
    constructor(core: Core);
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
    private normalizeFrozen;
    appendOrder(order: OpenMaker): Frozen;
    takeOrder(oid: OrderId, volume: Big): Frozen;
    removeOrder(oid: OrderId): Frozen | null;
}
