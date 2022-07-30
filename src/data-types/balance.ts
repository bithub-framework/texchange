import {
	HLike, H, HFactory,
	Length,
} from 'secretary-like';


export interface BalanceLike<H extends HLike<H>> extends Balance.Source<H> {
	[length: Length]: H;
	toJSON(): unknown;
	toString(): string;
}

class Balance<H extends HLike<H>> implements BalanceLike<H> {
	[length: Length]: H;

	public constructor(
		source: Balance.Source<H>,
		private factory: BalanceFactory<H>,
	) {
		({
			[Length.LONG]: this[Length.LONG],
			[Length.SHORT]: this[Length.SHORT],
		} = source);
	}

	public toJSON(): unknown {
		return this.factory.capture(this);
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}
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
		return new Balance(source, this);
	}

	public capture(balance: BalanceLike<H>): Balance.Snapshot {
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
