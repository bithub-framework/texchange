import { HLike, H, HFactory, Length } from 'secretary-like';
export declare class Margin<H extends HLike<H>> {
    private long;
    private short;
    constructor(long: H, short: H);
    get(length: Length): H;
    set(length: Length, margin: H): void;
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
