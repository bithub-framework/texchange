import { HLike, H, HFactory, SidePair } from 'secretary-like';
export declare class Decrements<H extends HLike<H>> extends SidePair<Map<string, H>> {
}
export declare namespace Decrements {
    interface Snapshot {
        bids: [string, H.Snapshot][];
        asks: [string, H.Snapshot][];
    }
}
export declare class DecrementsFactory<H extends HLike<H>> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    capture(decrements: Decrements<H>): Decrements.Snapshot;
    restore(snapshot: Decrements.Snapshot): Decrements<H>;
}
