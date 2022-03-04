import { OrderId, OpenMaker, OpenOrder, ReadonlyRecur, JsonCompatible } from 'interfaces';
import { Frozen } from './makers.d/frozon';
import { Model } from './model';
import Big from 'big.js';
import { Context } from '../context';
export declare abstract class Makers extends Model<Snapshot> implements Iterable<Readonly<OpenMaker>> {
    private orders;
    private frozens;
    totalUnfilledQuantity: {
        [side: number]: Big;
    };
    totalFrozen: Frozen;
    protected abstract context: Context;
    [Symbol.iterator](): IterableIterator<Readonly<OpenMaker>>;
    getOrder(id: OrderId): Readonly<OpenMaker>;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
    private normalizeFrozen;
    protected abstract toFreeze(order: OpenOrder): Frozen;
    appendOrder(order: Readonly<OpenMaker>): void;
    takeOrder(oid: OrderId, volume: Big): void;
    takeOrderQueue(oid: OrderId, volume?: Big): void;
    removeOrder(oid: OrderId): void;
    tryRemoveOrder(oid: OrderId): void;
}
declare type SnapshotStruct = {
    order: OpenMaker;
    frozen: Frozen;
}[];
export declare namespace Makers {
    type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = Makers.Snapshot;
export {};
