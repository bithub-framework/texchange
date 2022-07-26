import { HLike, OpenOrder, OrderId, MarketSpec } from 'secretary-like';
import { OpenMaker } from '../../interfaces/open-maker';
import { Frozen } from '../../interfaces/frozen/frozen';
import { TotalUnfilled, TotalUnfilledStatic } from './total-unfilled';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
export declare abstract class Makers<H extends HLike<H>> implements StatefulLike<Makers.Snapshot>, Iterable<OpenMaker<H>> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    private $orders;
    private $totalUnfilled;
    protected TotalUnfilled: TotalUnfilledStatic<H>;
    private totalFrozen;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>);
    getTotalUnfilled(): TotalUnfilled<H>;
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
    type Snapshot = readonly OpenMaker.Snapshot[];
}
