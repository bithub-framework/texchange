import { HLike, OpenOrder, OrderId, MarketSpec, AccountSpec } from 'secretary-like';
import { OpenMaker } from '../../data-types/open-maker';
import { Frozen } from '../../data-types/frozen';
import { TotalUnfilled, TotalUnfilledFactory } from './total-unfilled';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
export declare abstract class Makers<H extends HLike<H>> implements StatefulLike<Makers.Snapshot>, Iterable<OpenMaker<H>> {
    protected context: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpec<H>;
    protected accountSpec: AccountSpec;
    private $orders;
    private $totalUnfilled;
    protected totalUnfilledFactory: TotalUnfilledFactory<H>;
    private totalFrozen;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec);
    getTotalUnfilled(): TotalUnfilled<H>;
    getTotalFrozen(): Frozen<H>;
    [Symbol.iterator](): IterableIterator<OpenMaker<H>>;
    getOrder(oid: OrderId): OpenMaker<H>;
    protected $getOrder(oid: OrderId): OpenMaker<H>;
    capture(): Makers.Snapshot;
    restore(snapshot: Makers.Snapshot): void;
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
