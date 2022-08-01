import { HLike, H, HFactory, OpenOrder, OpenOrderFactory, CompositeDataFactoryLike, CompositeDataLike } from 'secretary-like';
import { FrozenFactory, Frozen } from './frozen';
export interface OpenMaker<H extends HLike<H>> extends OpenOrder<H>, OpenMaker.Source<H>, CompositeDataLike {
    price: H;
    quantity: H;
    behind: H;
    frozen: Frozen<H>;
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
    create(source: OpenMaker.Source<H>): OpenMaker<H>;
    capture(order: OpenMaker<H>): OpenMaker.Snapshot;
    restore(snapshot: OpenMaker.Snapshot): OpenMaker<H>;
}
