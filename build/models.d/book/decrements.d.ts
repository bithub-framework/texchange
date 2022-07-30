import { Side, HLike, H, HFactory } from 'secretary-like';
export interface Decrements<H extends HLike<H>> {
    [side: Side]: Map<string, H>;
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
