import { HLike, SidePair } from 'secretary-like';
export declare class TotalUnfilled<H extends HLike<H>> extends SidePair<H> {
}
export declare class TotalUnfilledFactory<H extends HLike<H>> {
    copy(totalUnfilled: TotalUnfilled<H>): TotalUnfilled<H>;
}
