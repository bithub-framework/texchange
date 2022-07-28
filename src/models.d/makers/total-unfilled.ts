import {
	HLike,
	Side,
} from 'secretary-like';


export class TotalUnfilled<H extends HLike<H>>  {
	[side: Side]: H;
}

export class TotalUnfilledFactory<H extends HLike<H>> {
	public copy(
		totalUnfilled: TotalUnfilled<H>,
	): TotalUnfilled<H> {
		return {
			[Side.BID]: totalUnfilled[Side.BID],
			[Side.ASK]: totalUnfilled[Side.ASK],
		};
	}
}
