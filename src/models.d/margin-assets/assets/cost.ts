import {
	HLike, H, HFactory,
	Length,
	LengthPair,
} from 'secretary-like';



export class Cost<H extends HLike<H>> extends LengthPair<H> { }

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
			long: this.hFactory.capture(cost.get(Length.LONG)),
			short: this.hFactory.capture(cost.get(Length.SHORT)),
		};
	}

	public restore(snapshot: Cost.Snapshot): Cost<H> {
		return new Cost<H>(
			this.hFactory.restore(snapshot.long),
			this.hFactory.restore(snapshot.short),
		);
	}

	public copy(cost: Cost<H>): Cost<H> {
		return new Cost<H>(
			cost.get(Length.LONG),
			cost.get(Length.SHORT),
		);
	}
}
