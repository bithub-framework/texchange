import {
	HLike,
	Side,
	SidePair,
} from 'secretary-like';


export class TotalUnfilled<H extends HLike<H>> extends SidePair<H> { }

export class TotalUnfilledFactory<H extends HLike<H>> {
	public copy(
		totalUnfilled: TotalUnfilled<H>,
	): TotalUnfilled<H> {
		return new TotalUnfilled<H>(
			totalUnfilled.get(Side.BID),
			totalUnfilled.get(Side.ASK),
		);
	}
}
