import {
	HLike, H, HFactory,
	Length,
	CompositeDataLike,
	CompositeDataFactoryLike,
} from 'secretary-like';


export interface Balance<H extends HLike<H>>
	extends Balance.Source<H>, CompositeDataLike {
	[length: Length]: H;
}

class ConcreteBalance<H extends HLike<H>> implements Balance<H> {
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

export class BalanceFactory<H extends HLike<H>> implements
	CompositeDataFactoryLike<
	Balance.Source<H>,
	Balance<H>,
	Balance.Snapshot>
{
	public constructor(
		private hFactory: HFactory<H>,
	) { }

	public new(source: Balance.Source<H>): ConcreteBalance<H> {
		return new ConcreteBalance(source, this);
	}

	public capture(balance: Balance<H>): Balance.Snapshot {
		return {
			long: this.hFactory.capture(balance[Length.LONG]),
			short: this.hFactory.capture(balance[Length.SHORT]),
		};
	}

	public restore(snapshot: Balance.Snapshot): ConcreteBalance<H> {
		return this.new({
			[Length.LONG]: this.hFactory.restore(snapshot.long),
			[Length.SHORT]: this.hFactory.restore(snapshot.short),
		});
	}
}
