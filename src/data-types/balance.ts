import {
	HLike, H, HFactory,
	Length,
} from 'secretary-like';


export interface Balance<H extends HLike<H>> extends Balance.Source<H> {
	[length: Length]: H;
}

export namespace Balance {
	export interface Source<H extends HLike<H>> {
		[length: Length]: H;
	}

	export interface Snapshot {
		readonly long: H.Snapshot;
		readonly short: H.Snapshot;
	}
}

export class BalanceFactory<H extends HLike<H>> {
	public constructor(
		private hFactory: HFactory<H>,
	) { }

	public new(source: Balance.Source<H>): Balance<H> {
		return <Balance<H>>source;
	}

	public capture(balance: Balance<H>): Balance.Snapshot {
		return {
			long: this.hFactory.capture(balance[Length.LONG]),
			short: this.hFactory.capture(balance[Length.SHORT]),
		};
	}

	public restore(snapshot: Balance.Snapshot): Balance<H> {
		return this.new({
			[Length.LONG]: this.hFactory.restore(snapshot.long),
			[Length.SHORT]: this.hFactory.restore(snapshot.short),
		});
	}
}
