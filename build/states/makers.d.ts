import { OrderId, OpenMaker, Frozen, StateLike, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export declare type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
export declare class StateMakers extends Map<OrderId, OpenMaker> implements StateLike<Snapshot> {
    private core;
    private frozens;
    constructor(core: Core, snapshot?: TypeRecur<Snapshot, Big, string>);
    capture(): Snapshot;
    addOrder(order: OpenMaker): Frozen;
    takeOrder(oid: OrderId, volume: Big, dollarVolume: Big): Frozen;
    removeOrder(oid: OrderId): Frozen | null;
    private calcThawedBalance;
}
