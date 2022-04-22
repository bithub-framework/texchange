import { Side, HLike, HStatic, TexchangeOrderId, TexchangeOrderIdStatic, TexchangeOpenMakerStatic, TexchangeOpenMaker, TexchangeOpenOrder, OpenMaker } from 'interfaces';
import { Frozen, FrozenStatic } from './frozon';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
export declare abstract class Makers<H extends HLike<H>> implements StatefulLike<Makers.Snapshot>, Iterable<TexchangeOpenMaker<H>> {
    protected context: Context<H>;
    private $orders;
    private $frozens;
    private $totalUnfilled;
    protected OrderId: TexchangeOrderIdStatic;
    protected OpenMaker: TexchangeOpenMakerStatic<H>;
    protected Frozen: FrozenStatic<H>;
    protected TotalUnfilled: Makers.TotalUnfilledStatic<H>;
    private totalFrozen;
    constructor(context: Context<H>);
    getTotalUnfilled(): Makers.TotalUnfilled.Functional<H>;
    getTotalFrozen(): Frozen<H>;
    [Symbol.iterator](): IterableIterator<TexchangeOpenMaker<H>>;
    getOrder(id: TexchangeOrderId): TexchangeOpenMaker<H>;
    capture(): Makers.Snapshot;
    restore(snapshot: Makers.Snapshot): void;
    private normalizeFrozen;
    protected abstract toFreeze(order: TexchangeOpenOrder<H>): Frozen<H>;
    appendOrder(order: TexchangeOpenMaker<H>): void;
    takeOrder(oid: TexchangeOrderId, volume: H): void;
    takeOrderQueue(oid: TexchangeOrderId, volume?: H): void;
    removeOrder(oid: TexchangeOrderId): void;
    forcedlyRemoveOrder(oid: TexchangeOrderId): void;
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
    type Snapshot = {
        order: OpenMaker.Snapshot;
        frozen: Frozen.Snapshot;
    }[];
}
