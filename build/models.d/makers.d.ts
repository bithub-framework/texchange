import { OrderId, OpenMaker, OpenOrder } from 'interfaces';
import { Frozen } from './makers.d/frozon';
import { Model, Stringified } from './model';
import Big from 'big.js';
import { Context } from '../context';
export declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
export declare type Backup = Stringified<Snapshot>;
export declare class Makers extends Model<Snapshot> implements Iterable<Readonly<OpenMaker>> {
    protected context: Context;
    private orders;
    private frozens;
    totalUnfilledQuantity: {
        [side: number]: Big;
    };
    totalFrozen: Frozen;
    constructor(context: Context);
    [Symbol.iterator](): IterableIterator<Readonly<OpenMaker>>;
    getOrder(id: OrderId): Readonly<OpenMaker>;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
    private normalizeFrozen;
    protected toFreeze(order: OpenOrder): Frozen;
    appendOrder(order: Readonly<OpenMaker>): void;
    takeOrder(oid: OrderId, volume: Big): void;
    takeOrderQueue(oid: OrderId, volume?: Big): void;
    removeOrder(oid: OrderId): void;
    tryRemoveOrder(oid: OrderId): void;
}
