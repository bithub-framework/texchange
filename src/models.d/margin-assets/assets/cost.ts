import {
	HLike, H, HStatic,
	Length,
} from 'secretary-like';



export class Cost<H extends HLike<H>> {
	public constructor(
		private long: H,
		private short: H,
	) { }

	public get(length: Length): H {
		if (length === Length.LONG) return this.long;
		else return this.short;
	}
	public set(length: Length, cost: H): void {
		if (length === Length.LONG) this.long = cost;
		else this.short = cost;
	}
}

export namespace Cost {
	export interface Snapshot {
		readonly long: H.Snapshot;
		readonly short: H.Snapshot;
	}
}

export class CostStatic<H extends HLike<H>> {
	public constructor(
		private H: HStatic<H>,
	) { }

	public capture(cost: Cost<H>): Cost.Snapshot {
		return {
			long: this.H.capture(cost.get(Length.LONG)),
			short: this.H.capture(cost.get(Length.SHORT)),
		};
	}

	public restore(snapshot: Cost.Snapshot): Cost<H> {
		return new Cost<H>(
			this.H.restore(snapshot.long),
			this.H.restore(snapshot.short),
		);
	}

	public copy(cost: Cost<H>): Cost<H> {
		return new Cost<H>(
			cost.get(Length.LONG),
			cost.get(Length.SHORT),
		);
	}
}
