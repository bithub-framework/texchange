import { Side, HLike, HStatic, OpenOrder, OpenOrderStatic, OrderId } from 'interfaces';
import { OpenMaker, OpenMakerStatic } from '../../interfaces/open-maker';
import { Frozen, FrozenStatic } from './frozen';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
export declare abstract class Makers<H extends HLike<H>> implements StatefulLike<Makers.Snapshot>, Iterable<OpenMaker<H>> {
    protected context: Context<H>;
    private $orders;
    private $totalUnfilled;
    protected Frozen: FrozenStatic<H>;
    protected OpenOrder: OpenOrderStatic<H>;
    protected OpenMaker: OpenMakerStatic<H>;
    protected TotalUnfilled: Makers.TotalUnfilledStatic<H>;
    private totalFrozen;
    constructor(context: Context<H>);
    getTotalUnfilled(): Makers.TotalUnfilled.Functional<H>;
    getTotalFrozen(): Frozen<H>;
    [Symbol.iterator](): IterableIterator<OpenMaker<H>>;
    getOrder(oid: OrderId): OpenMaker<H>;
    protected $getOrder(oid: OrderId): OpenMaker<H>;
    capture(): Makers.Snapshot;
    restore(snapshot: Makers.Snapshot): void;
    private normalizeFrozen;
    protected abstract toFreeze(order: OpenOrder<H>): Frozen<H>;
    appendOrder(order: OpenOrder<H>, behind: H): void;
    takeOrder(oid: OrderId, volume: H): void;
    takeOrderQueue(oid: OrderId, volume?: H): void;
    removeOrder(oid: OrderId): void;
    forcedlyRemoveOrder(oid: OrderId): void;
}
export declare namespace Makers {
    interface TotalUnfilled<H> {
        [side: Side]: H;
    }
    namespace TotalUnfilled {
        interface Functional<H> {
            readonly [side: Side]: H;
        }
    }
    class TotalUnfilledStatic<H extends HLike<H>> {
        private H;
        constructor(H: HStatic<H>);
        copy(totalUnfilled: TotalUnfilled<H> | TotalUnfilled.Functional<H>): TotalUnfilled<H> | TotalUnfilled.Functional<H>;
    }
    type Snapshot = readonly OpenMaker.Snapshot[];
}
