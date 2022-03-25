import { Side, HStatic, HLike, H } from 'interfaces';
export interface Decrements<H extends HLike<H>> {
    [side: Side]: Map<string, H>;
}
export declare namespace Decrements {
    interface Snapshot {
        [side: Side]: [string, H.Snapshot][];
    }
}
export declare class DecrementsStatic<H extends HLike<H>> {
    private H;
    constructor(H: HStatic<H>);
    capture(decrements: Decrements<H>): Decrements.Snapshot;
    restore(snapshot: Decrements.Snapshot): Decrements<H>;
}
