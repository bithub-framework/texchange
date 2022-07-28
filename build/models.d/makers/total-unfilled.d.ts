import { HLike, Side } from 'secretary-like';
export declare class TotalUnfilled<H extends HLike<H>> {
    [side: Side]: H;
}
export declare class TotalUnfilledFactory<H extends HLike<H>> {
    copy(totalUnfilled: TotalUnfilled<H>): TotalUnfilled<H>;
}
