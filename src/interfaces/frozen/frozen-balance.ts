import {
	HLike, H, HStatic,
	Length,
} from 'secretary-like';


export class FrozenBalance<H extends HLike<H>> {
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

export namespace FrozenBalance {
	export interface Snapshot {
		readonly long: H.Snapshot;
		readonly short: H.Snapshot;
	}
}

export class FrozenBalanceStatic<H extends HLike<H>> {
	public constructor(
		private H: HStatic<H>,
	) { }

	public capture(balance: FrozenBalance<H>): FrozenBalance.Snapshot {
		return {
			long: this.H.capture(balance.get(Length.LONG)),
			short: this.H.capture(balance.get(Length.SHORT)),
		};
	}

	public restore(snapshot: FrozenBalance.Snapshot): FrozenBalance<H> {
		return new FrozenBalance(
			this.H.restore(snapshot.long),
			this.H.restore(snapshot.short),
		);
	}

	public copy(balance: FrozenBalance<H>): FrozenBalance<H> {
		return new FrozenBalance(
			balance.get(Length.LONG),
			balance.get(Length.SHORT),
		);
	}
}
