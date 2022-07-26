import { HLike, H, HFactory, Length } from 'secretary-like';
export declare class Cost<H extends HLike<H>> {
    private long;
    private short;
    constructor(long: H, short: H);
    get(length: Length): H;
    set(length: Length, cost: H): void;
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
