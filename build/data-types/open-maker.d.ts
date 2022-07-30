import { HLike, H, HFactory, OpenOrder, OpenOrderFactory, Length, Side, Action, OrderId, CompositeDataFactoryLike, CompositeDataLike } from 'secretary-like';
import { FrozenFactory, Frozen } from './frozen';
export interface OpenMaker<H extends HLike<H>> extends OpenOrder<H>, OpenMaker.Source<H>, CompositeDataLike {
    behind: H;
    frozen: Frozen<H>;
}
declare class ConcreteOpenMaker<H extends HLike<H>> implements OpenMaker<H> {
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
    constructor(source: OpenMaker.Source<H>, factory: OpenMakerFactory<H>, frozenFactory: FrozenFactory<H>);
    toJSON(): unknown;
    toString(): string;
}
export declare namespace OpenMaker {
    interface Source<H extends HLike<H>> extends OpenOrder.Source<H> {
        behind: H;
        frozen: Frozen.Source<H>;
    }
    interface Snapshot extends OpenOrder.Snapshot {
        readonly behind: H.Snapshot;
        readonly frozen: Frozen.Snapshot;
    }
}
export declare class OpenMakerFactory<H extends HLike<H>> implements CompositeDataFactoryLike<OpenMaker.Source<H>, OpenMaker<H>, OpenMaker.Snapshot> {
    private hFactory;
    private frozenFactory;
    private openOrderFactory;
    constructor(hFactory: HFactory<H>, frozenFactory: FrozenFactory<H>, openOrderFactory: OpenOrderFactory<H>);
    new(source: OpenMaker.Source<H>): ConcreteOpenMaker<H>;
    capture(order: OpenMaker<H>): OpenMaker.Snapshot;
    restore(snapshot: OpenMaker.Snapshot): ConcreteOpenMaker<H>;
}
export {};
