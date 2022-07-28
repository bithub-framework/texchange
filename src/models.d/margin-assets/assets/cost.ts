import {
	HLike, H, HFactory,
	Length,
} from 'secretary-like';



export class Cost<H extends HLike<H>> {
	[length: Length]: H;
}

export namespace Cost {
	export interface Snapshot {
		readonly long: H.Snapshot;
		readonly short: H.Snapshot;
	}
}

export class CostFactory<H extends HLike<H>> {
	public constructor(
		private hFactory: HFactory<H>,
	) { }

	public capture(cost: Cost<H>): Cost.Snapshot {
		return {
			long: this.hFactory.capture(cost[Length.LONG]),
			short: this.hFactory.capture(cost[Length.SHORT]),
		};
	}

	public restore(snapshot: Cost.Snapshot): Cost<H> {
		return {
			[Length.LONG]: this.hFactory.restore(snapshot.long),
			[Length.SHORT]: this.hFactory.restore(snapshot.short),
		};
	}

	public copy(cost: Cost<H>): Cost<H> {
		return {
			[Length.LONG]: cost[Length.LONG],
			[Length.SHORT]: cost[Length.SHORT],
		};
	}
}
