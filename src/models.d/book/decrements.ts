import {
	Side,
	HLike, H, HFactory,
	SidePair,
} from 'secretary-like';


export class Decrements<H extends HLike<H>> extends SidePair<Map<string, H>> { }

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
			bids: [...decrements.get(Side.BID)].map(
				([priceString, decrement]) =>
					[priceString, this.hFactory.capture(decrement)],
			),
			asks: [...decrements.get(Side.ASK)].map(
				([priceString, decrement]) =>
					[priceString, this.hFactory.capture(decrement)],
			),
		};
	}

	public restore(snapshot: Decrements.Snapshot): Decrements<H> {
		return new Decrements<H>(
			new Map<string, H>(
				snapshot.bids.map(
					([priceString, decrement]) =>
						[priceString, this.hFactory.restore(decrement)]
				),
			),
			new Map<string, H>(
				snapshot.asks.map(
					([priceString, decrement]) =>
						[priceString, this.hFactory.restore(decrement)]
				),
			),
		);
	}
}
