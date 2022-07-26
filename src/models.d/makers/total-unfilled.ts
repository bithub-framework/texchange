import {
	HLike,
	Side,
} from 'secretary-like';


export class TotalUnfilled<H extends HLike<H>> {
	public constructor(
		private bid: H,
		private ask: H,
	) { }

	public get(side: Side): H {
		if (side === Side.BID) return this.bid;
		else return this.ask;
	}

	public set(side: Side, unfilled: H): void {
		if (side === Side.BID) this.bid = unfilled;
		else this.ask = unfilled;
	}
}

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
