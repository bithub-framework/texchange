import { HLike, H, HStatic, OpenOrder } from 'interfaces';
import { Frozen, FrozenStatic } from './frozen';
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
export declare class OpenMakerStatic<H extends HLike<H>> {
    private H;
    private Frozen;
    private readonly OpenOrder;
    constructor(H: HStatic<H>, Frozen: FrozenStatic<H>);
    capture(order: OpenMaker<H>): OpenMaker.Snapshot;
    restore(snapshot: OpenMaker.Snapshot): OpenMaker<H>;
    copy(order: OpenMaker<H>): OpenMaker<H>;
}
