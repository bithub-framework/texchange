import { OrderId, OpenMaker, Frozen, TypeRecur } from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { type Hub } from '../hub';
export declare namespace Makers {
    type Snapshot = {
        order: OpenMaker;
        frozen: Frozen;
    }[];
    type Backup = TypeRecur<Snapshot, Big, string>;
}
export import Snapshot = Makers.Snapshot;
export import Backup = Makers.Backup;
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
