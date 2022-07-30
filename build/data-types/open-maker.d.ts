import { HLike, H, HFactory, OpenOrder, OpenOrderFactory, OpenOrderLike, Length, Side, Action, OrderId } from 'secretary-like';
import { Frozen, FrozenFactory } from './frozen';
export interface OpenMakerLike<H extends HLike<H>> extends OpenOrderLike<H>, OpenMaker.Source<H> {
    behind: H;
    frozen: Frozen<H>;
}
declare class OpenMaker<H extends HLike<H>> implements OpenMakerLike<H> {
    private factory;
    price: H;
    quantity: H;
    side: Side;
    length: Length;
    action: Action;
    filled: H;
    unfilled: H;
    id: OrderId;
    behind: H;
    frozen: Frozen<H>;
    constructor(source: OpenMaker.Source<H>, factory: OpenMakerFactory<H>);
    toJSON(): unknown;
    toString(): string;
}
export declare namespace OpenMaker {
    interface Source<H extends HLike<H>> extends OpenOrder.Source<H> {
        behind: H;
        frozen: Frozen<H>;
    }
    interface Snapshot extends OpenOrder.Snapshot {
        readonly behind: H.Snapshot;
        readonly frozen: Frozen.Snapshot;
    }
}
export declare class OpenMakerFactory<H extends HLike<H>> {
    private hFactory;
    private frozenFactory;
    private openOrderFactory;
    constructor(hFactory: HFactory<H>, frozenFactory: FrozenFactory<H>, openOrderFactory: OpenOrderFactory<H>);
    new(source: OpenMaker.Source<H>): OpenMaker<H>;
    capture(order: OpenMakerLike<H>): OpenMaker.Snapshot;
    restore(snapshot: OpenMaker.Snapshot): OpenMaker<H>;
}
export {};
