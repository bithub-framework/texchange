import { HLike, H, HFactory, LengthPair } from 'secretary-like';
export declare class Margin<H extends HLike<H>> extends LengthPair<H> {
}
export declare namespace Margin {
    interface Snapshot {
        readonly long: H.Snapshot;
        readonly short: H.Snapshot;
    }
}
export declare class MarginFactory<H extends HLike<H>> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    capture(margin: Margin<H>): Margin.Snapshot;
    restore(snapshot: Margin.Snapshot): Margin<H>;
    copy(margin: Margin<H>): Margin<H>;
}
