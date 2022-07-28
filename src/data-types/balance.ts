import {
	HLike, H, HFactory,
	Length,
} from 'secretary-like';


export class Balance<H extends HLike<H>>  {
	[length: Length]: H;
}

export namespace Balance {
	export interface Snapshot {
		readonly long: H.Snapshot;
		readonly short: H.Snapshot;
	}
}

export class BalanceFactory<H extends HLike<H>> {
	public constructor(
		private hFactory: HFactory<H>,
	) { }

	public capture(balance: Balance<H>): Balance.Snapshot {
		return {
			long: this.hFactory.capture(balance[Length.LONG]),
			short: this.hFactory.capture(balance[Length.SHORT]),
		};
	}

	public restore(snapshot: Balance.Snapshot): Balance<H> {
		return {
			[Length.LONG]: this.hFactory.restore(snapshot.long),
			[Length.SHORT]: this.hFactory.restore(snapshot.short),
		};
	}

	public copy(balance: Balance<H>): Balance<H> {
		return {
			[Length.LONG]: balance[Length.LONG],
			[Length.SHORT]: balance[Length.SHORT],
		};
	}
}
