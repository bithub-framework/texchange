import { Side, HLike, TexchangeOrderId, TexchangeOrderIdStatic, TexchangeOpenMakerStatic, TexchangeOpenMaker, TexchangeOpenOrder, OpenMaker } from 'interfaces';
import { Frozen, FrozenStatic } from './frozon';
import { Context } from '../../context/context';
import { StatefulLike } from 'startable';
export declare abstract class Makers<H extends HLike<H>> implements StatefulLike<Makers.Snapshot>, Iterable<TexchangeOpenMaker<H>> {
    protected readonly context: Context<H>;
    private orders;
    private frozens;
    private totalUnfilled;
    protected readonly OrderId: TexchangeOrderIdStatic;
    protected readonly OpenMaker: TexchangeOpenMakerStatic<H>;
    protected readonly Frozen: FrozenStatic<H>;
    constructor(context: Context<H>);
    private totalFrozen;
    getTotalUnfilled(): Makers.TotalUnfilled<H>;
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
