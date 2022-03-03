import { OrderId, OpenMaker, Frozen, TypeRecur, OpenOrder } from '../interfaces';
import { Model } from './model';
import Big from 'big.js';
import { Context } from '../context';
declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Makers extends Model<Snapshot, Backup> implements Iterable<Readonly<OpenMaker>> {
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
export {};
