import { OrderId, OpenMaker, Frozen, TypeRecur, OpenOrder } from '../interfaces';
import { ModelLike } from './model';
import Big from 'big.js';
import { Context } from '../context';
declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Makers extends Map<OrderId, Readonly<OpenMaker>> implements ModelLike<Snapshot, Backup, boolean> {
    private context;
    stage?: boolean;
    private frozens;
    totalUnfilledQuantity: {
        [side: number]: Big;
    };
    totalFrozen: Frozen;
    constructor(context: Context);
    initializeStage(): void;
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
