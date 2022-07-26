import {
	Side,
	HLike, H, HFactory,
} from 'secretary-like';


export class Decrements<H extends HLike<H>> {
	public constructor(
		private bids: Map<string, H>,
		private asks: Map<string, H>,
	) { }

	public get(side: Side): Map<string, H> {
		if (side === Side.BID) return this.bids;
		else return this.asks;
	}
	public set(side: Side, map: Map<string, H>): void {
		if (side === Side.BID) this.bids = map;
		else this.asks = map;
	}
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
