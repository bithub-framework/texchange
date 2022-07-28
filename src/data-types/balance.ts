import {
	HLike, H, HFactory,
	Length,
	LengthPair,
} from 'secretary-like';


export class Balance<H extends HLike<H>> extends LengthPair<H> { }

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
			long: this.hFactory.capture(balance.get(Length.LONG)),
			short: this.hFactory.capture(balance.get(Length.SHORT)),
		};
	}

	public restore(snapshot: Balance.Snapshot): Balance<H> {
		return new Balance(
			this.hFactory.restore(snapshot.long),
			this.hFactory.restore(snapshot.short),
		);
	}

	public copy(balance: Balance<H>): Balance<H> {
		return new Balance(
			balance.get(Length.LONG),
			balance.get(Length.SHORT),
		);
	}
}
