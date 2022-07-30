import { HLike, OpenOrderLike, OrderId, MarketSpecLike, AccountSpecLike } from 'secretary-like';
import { OpenMakerLike, OpenMaker } from '../../data-types/open-maker';
import { FrozenLike } from '../../data-types/frozen';
import { TotalUnfilled, TotalUnfilledFactory } from './total-unfilled';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
export declare abstract class Makers<H extends HLike<H>> implements StatefulLike<Makers.Snapshot>, Iterable<OpenMakerLike<H>> {
    protected context: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpecLike<H>;
    protected accountSpec: AccountSpecLike;
    private $orders;
    private $totalUnfilled;
    protected totalUnfilledFactory: TotalUnfilledFactory<H>;
    private totalFrozen;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>, accountSpec: AccountSpecLike);
    getTotalUnfilled(): TotalUnfilled<H>;
    getTotalFrozen(): FrozenLike<H>;
    [Symbol.iterator](): IterableIterator<OpenMakerLike<H>>;
    getOrder(oid: OrderId): OpenMakerLike<H>;
    protected $getOrder(oid: OrderId): OpenMakerLike<H>;
    capture(): Makers.Snapshot;
    restore(snapshot: Makers.Snapshot): void;
    protected abstract toFreeze(order: OpenOrderLike<H>): FrozenLike<H>;
    appendOrder(order: OpenOrderLike<H>, behind: H): void;
    takeOrder(oid: OrderId, volume: H): void;
    takeOrderQueue(oid: OrderId, volume?: H): void;
    removeOrder(oid: OrderId): void;
    forcedlyRemoveOrder(oid: OrderId): void;
}
export declare namespace Makers {
    type Snapshot = readonly OpenMaker.Snapshot[];
}
