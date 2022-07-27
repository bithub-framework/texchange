import {
	HLike, H, HFactory,
	Length,
	LengthPair,
} from 'secretary-like';


export class Margin<H extends HLike<H>> extends LengthPair<H> { }

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
			long: this.hFactory.capture(margin.get(Length.LONG)),
			short: this.hFactory.capture(margin.get(Length.SHORT)),
		};
	}

	public restore(snapshot: Margin.Snapshot): Margin<H> {
		return new Margin(
			this.hFactory.restore(snapshot.long),
			this.hFactory.restore(snapshot.short),
		);
	}

	public copy(margin: Margin<H>): Margin<H> {
		return new Margin(
			margin.get(Length.LONG),
			margin.get(Length.SHORT),
		);
	}
}
