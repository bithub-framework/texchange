import { OrderId, OpenMaker, Frozen, TypeRecur } from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { type Hub } from '../hub';
declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
declare type Backup = TypeRecur<Snapshot, Big, string>;
export declare class Makers extends Map<OrderId, OpenMaker> implements StatefulLike<Snapshot, Backup> {
    private core;
    private frozens;
    unfilledSum: {
        [side: number]: Big;
    };
    frozenSum: Frozen;
    constructor(core: Hub);
    capture(): Snapshot;
    restore(snapshot: Backup): void;
    private normalizeFrozen;
    appendOrder(order: OpenMaker): void;
    takeOrder(oid: OrderId, volume: Big): void;
    removeOrder(oid: OrderId): void;
}
export {};
