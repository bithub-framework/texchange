import {
	HLike, H, HFactory,
	Length,
} from 'secretary-like';


export class Balance<H extends HLike<H>> {
	public constructor(
		private long: H,
		private short: H,
	) { }

	public get(length: Length): H {
		if (length === Length.LONG) return this.long;
		else return this.short;
	}
	public set(length: Length, balance: H): void {
		if (length === Length.LONG) this.long = balance;
		else this.short = balance;
	}
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
