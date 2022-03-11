import { OrderId, OpenMaker, OpenOrder, ReadonlyRecur, JsonCompatible } from 'interfaces';
import { Frozen } from './frozon';
import { Model } from '../../model';
import Big from 'big.js';
export declare abstract class Makers extends Model<Makers.Snapshot> implements Iterable<Readonly<OpenMaker>> {
    private orders;
    private frozens;
    totalUnfilledQuantity: {
        [side: number]: Big;
    };
    totalFrozen: Frozen;
    [Symbol.iterator](): IterableIterator<Readonly<OpenMaker>>;
    getOrder(id: OrderId): Readonly<OpenMaker>;
    capture(): Makers.Snapshot;
    restore(snapshot: Makers.Snapshot): void;
    private normalizeFrozen;
    protected abstract toFreeze(order: OpenOrder): Frozen;
    appendOrder(order: Readonly<OpenMaker>): void;
    takeOrder(oid: OrderId, volume: Big): void;
    takeOrderQueue(oid: OrderId, volume?: Big): void;
    removeOrder(oid: OrderId): void;
    tryRemoveOrder(oid: OrderId): void;
}
export declare namespace Makers {
    type SnapshotStruct = {
        order: OpenMaker;
        frozen: Frozen;
    }[];
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
    export {};
}
