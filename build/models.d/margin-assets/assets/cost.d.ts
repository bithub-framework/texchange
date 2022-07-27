import { HLike, H, HFactory, LengthPair } from 'secretary-like';
export declare class Cost<H extends HLike<H>> extends LengthPair<H> {
}
export declare namespace Cost {
    interface Snapshot {
        readonly long: H.Snapshot;
        readonly short: H.Snapshot;
    }
}
export declare class CostFactory<H extends HLike<H>> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    capture(cost: Cost<H>): Cost.Snapshot;
    restore(snapshot: Cost.Snapshot): Cost<H>;
    copy(cost: Cost<H>): Cost<H>;
}
