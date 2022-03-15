import { Side, HLike, ConcreteOrderId, ConcreteOrderIdStatic, ConcreteOpenMakerStatic, ConcreteOpenMaker, ConcreteOpenOrder, OpenMaker } from 'interfaces';
import { Frozen, FrozenStatic } from './frozon';
import { Model } from '../../model';
import { Context } from '../../context';
export declare abstract class Makers<H extends HLike<H>> extends Model<H, Makers.Snapshot> implements Iterable<ConcreteOpenMaker<H>> {
    protected readonly context: Context<H>;
    private orders;
    private frozens;
    private totalUnfilled;
    protected readonly OrderId: ConcreteOrderIdStatic;
    protected readonly OpenMaker: ConcreteOpenMakerStatic<H>;
    protected readonly Frozen: FrozenStatic<H>;
    protected constructor(context: Context<H>);
    private totalFrozen;
    getTotalUnfilled(): Makers.TotalUnfilled<H>;
    getTotalFrozen(): Frozen<H>;
    [Symbol.iterator](): IterableIterator<ConcreteOpenMaker<H>>;
    getOrder(id: ConcreteOrderId): ConcreteOpenMaker<H>;
    capture(): Makers.Snapshot;
    restore(snapshot: Makers.Snapshot): void;
    private normalizeFrozen;
    protected abstract toFreeze(order: ConcreteOpenOrder<H>): Frozen<H>;
    appendOrder(order: ConcreteOpenMaker<H>): void;
    takeOrder(oid: ConcreteOrderId, volume: H): void;
    takeOrderQueue(oid: ConcreteOrderId, volume?: H): void;
    removeOrder(oid: ConcreteOrderId): void;
    forcedlyRemoveOrder(oid: ConcreteOrderId): void;
}
export declare namespace Makers {
    interface TotalUnfilled<H> {
        readonly [side: Side]: H;
    }
    namespace TotalUnfilled {
        interface MutablePlain<H> {
            [side: Side]: H;
        }
    }
    type Snapshot = {
        order: OpenMaker.Snapshot;
        frozen: Frozen.Snapshot;
    }[];
}
