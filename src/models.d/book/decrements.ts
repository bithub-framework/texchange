import {
	Side,
	HLike, H, HFactory,
} from 'secretary-like';


export interface Decrements<H extends HLike<H>> {
	[side: Side]: Map<string, H>;
}

export namespace Decrements {
	export interface Snapshot {
		bids: [string, H.Snapshot][];
		asks: [string, H.Snapshot][];
	}
}

export class DecrementsFactory<H extends HLike<H>> {
	public constructor(
		private hFactory: HFactory<H>,
	) { }

	public capture(decrements: Decrements<H>): Decrements.Snapshot {
		return {
			bids: [...decrements[Side.BID]].map(
				([priceString, decrement]) =>
					[priceString, this.hFactory.capture(decrement)],
			),
			asks: [...decrements[Side.ASK]].map(
				([priceString, decrement]) =>
					[priceString, this.hFactory.capture(decrement)],
			),
		};
	}

	public restore(snapshot: Decrements.Snapshot): Decrements<H> {
		return {
			[Side.BID]: new Map<string, H>(
				snapshot.bids.map(
					([priceString, decrement]) =>
						[priceString, this.hFactory.restore(decrement)]
				),
			),
			[Side.ASK]: new Map<string, H>(
				snapshot.asks.map(
					([priceString, decrement]) =>
						[priceString, this.hFactory.restore(decrement)]
				),
			),
		};
	}
}
