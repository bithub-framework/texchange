import { HLike, H, HFactory, OpenOrder, OpenOrderFactory } from 'secretary-like';
import { Frozen, FrozenFactory } from './frozen';
export interface OpenMaker<H extends HLike<H>> extends OpenOrder<H> {
    behind: H;
    frozen: Frozen<H>;
}
export declare namespace OpenMaker {
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
    capture(order: OpenMaker<H>): OpenMaker.Snapshot;
    restore(snapshot: OpenMaker.Snapshot): OpenMaker<H>;
    copy(order: OpenMaker<H>): OpenMaker<H>;
}
