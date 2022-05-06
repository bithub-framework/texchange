import {
	Side,
	HStatic, HLike, H,
} from 'secretary-like';


export interface Decrements<H extends HLike<H>> {
	[side: Side]: Map<string, H>;
}

export namespace Decrements {
	export interface Snapshot {
		[side: Side]: [string, H.Snapshot][],
	}
}

export class DecrementsStatic<H extends HLike<H>> {
	public constructor(
		private H: HStatic<H>,
	) { }

	public capture(decrements: Decrements<H>): Decrements.Snapshot {
		return {
			[Side.ASK]: [...decrements[Side.ASK]].map(
				([priceString, decrement]) =>
					[priceString, this.H.capture(decrement)],
			),
			[Side.BID]: [...decrements[Side.BID]].map(
				([priceString, decrement]) =>
					[priceString, this.H.capture(decrement)],
			),
		};
	}

	public restore(snapshot: Decrements.Snapshot): Decrements<H> {
		const decrements: Decrements<H> = {};
		for (const side of [Side.ASK, Side.BID]) {
			decrements[side] = new Map<string, H>(
				snapshot[side].map(
					([priceString, decrement]) =>
						[priceString, this.H.restore(decrement)]
				));
		}
		return decrements;
	}
}
