import { Side, HLike, H, HFactory } from 'secretary-like';
export declare class Decrements<H extends HLike<H>> {
    private bids;
    private asks;
    constructor(bids: Map<string, H>, asks: Map<string, H>);
    get(side: Side): Map<string, H>;
    set(side: Side, map: Map<string, H>): void;
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
