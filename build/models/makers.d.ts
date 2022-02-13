import { OrderId, OpenMaker, Frozen, TypeRecur } from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { type Hub } from '../hub';
declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Makers extends Map<OrderId, Readonly<OpenMaker>> implements StatefulLike<Snapshot, Backup> {
    private hub;
    private frozens;
    totalUnfilledQuantity: {
        [side: number]: Big;
    };
    totalFrozen: Frozen;
    constructor(hub: Hub);
    capture(): Snapshot;
    restore(snapshot: Backup): void;
    private normalizeFrozen;
    appendOrder(order: OpenMaker): void;
    takeOrder(oid: OrderId, volume: Big): void;
    takeOrderQueue(oid: OrderId, volume?: Big): void;
    removeOrder(oid: OrderId): void;
    tryRemoveOrder(oid: OrderId): void;
}
export {};
