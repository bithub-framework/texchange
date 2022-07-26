import { HLike, HStatic, Side } from 'secretary-like';
export declare class TotalUnfilled<H extends HLike<H>> {
    private bid;
    private ask;
    constructor(bid: H, ask: H);
    get(side: Side): H;
    set(side: Side, unfilled: H): void;
}
export declare class TotalUnfilledStatic<H extends HLike<H>> {
    private H;
    constructor(H: HStatic<H>);
    copy(totalUnfilled: TotalUnfilled<H>): TotalUnfilled<H>;
}
