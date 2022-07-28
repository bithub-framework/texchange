import {
	HLike, H, HFactory,
	Length,
} from 'secretary-like';


export class Margin<H extends HLike<H>>  {
	[length: Length]: H;
}

export namespace Margin {
	export interface Snapshot {
		readonly long: H.Snapshot;
		readonly short: H.Snapshot;
	}
}

export class MarginFactory<H extends HLike<H>>{
	public constructor(
		private hFactory: HFactory<H>,
	) { }

	public capture(margin: Margin<H>): Margin.Snapshot {
		return {
			long: this.hFactory.capture(margin[Length.LONG]),
			short: this.hFactory.capture(margin[Length.SHORT]),
		};
	}

	public restore(snapshot: Margin.Snapshot): Margin<H> {
		return {
			[Length.LONG]: this.hFactory.restore(snapshot.long),
			[Length.SHORT]: this.hFactory.restore(snapshot.short),
		};
	}

	public copy(margin: Margin<H>): Margin<H> {
		return {
			[Length.LONG]: margin[Length.LONG],
			[Length.SHORT]: margin[Length.SHORT],
		};
	}
}
