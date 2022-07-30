import {
	Length,
	HLike, HFactory,
	Position,
	PositionLike,
	PositionFactory,
	CompositeDataFactoryLike,
	CompositeDataLike,
} from 'secretary-like';
import {
	Balance,
	BalanceLike,
	BalanceFactory,
} from './balance';


export interface FrozenLike<H extends HLike<H>>
	extends Frozen.Source<H>, CompositeDataLike {
	balance: BalanceLike<H>;
	position: PositionLike<H>;
}

class Frozen<H extends HLike<H>> implements FrozenLike<H> {
	public balance: BalanceLike<H>;
	public position: PositionLike<H>;

	public constructor(
		source: Frozen.Source<H>,
		private factory: FrozenFactory<H>,
		balanceFactory: BalanceFactory<H>,
		positionFactory: PositionFactory<H>,
	) {
		this.balance = balanceFactory.new(source.balance);
		this.position = positionFactory.new(source.position);
	}

	public toJSON(): unknown {
		return this.factory.capture(this);
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

export namespace Frozen {
	export interface Source<H extends HLike<H>> {
		balance: Balance.Source<H>;
		position: Position.Source<H>;
	}

	export interface Snapshot {
		readonly balance: Balance.Snapshot;
		readonly position: Position.Snapshot;
	}
}

export class FrozenFactory<H extends HLike<H>> implements
	CompositeDataFactoryLike<
	Frozen.Source<H>,
	FrozenLike<H>,
	Frozen.Snapshot>
{
	public constructor(
		private balanceFactory: BalanceFactory<H>,
		private positionFactory: PositionFactory<H>,
	) { }

	public new(source: Frozen.Source<H>): Frozen<H> {
		return new Frozen(
			source,
			this,
			this.balanceFactory,
			this.positionFactory,
		);
	}

	public capture(frozen: FrozenLike<H>): Frozen.Snapshot {
		return {
			balance: this.balanceFactory.capture(frozen.balance),
			position: this.positionFactory.capture(frozen.position),
		}
	}

	public restore(snapshot: Frozen.Snapshot): Frozen<H> {
		return this.new({
			balance: this.balanceFactory.restore(snapshot.balance),
			position: this.positionFactory.restore(snapshot.position),
		});
	}
}

export class FrozenStatic<H extends HLike<H>> {
	public constructor(
		private frozenFactory: FrozenFactory<H>,
		private hFactory: HFactory<H>,
	) { }

	public plus(
		x: FrozenLike<H>,
		y: FrozenLike<H>,
	): FrozenLike<H> {
		return this.frozenFactory.new({
			balance: {
				[Length.LONG]: x.balance[Length.LONG].plus(y.balance[Length.LONG]),
				[Length.SHORT]: x.balance[Length.SHORT].plus(y.balance[Length.SHORT]),
			},
			position: {
				[Length.LONG]: x.position[Length.LONG].plus(y.position[Length.LONG]),
				[Length.SHORT]: x.position[Length.SHORT].plus(y.position[Length.SHORT]),
			},
		});
	}

	public readonly ZERO: FrozenLike<H> = this.frozenFactory.new({
		balance: {
			[Length.LONG]: this.hFactory.from(0),
			[Length.SHORT]: this.hFactory.from(0),
		},
		position: {
			[Length.LONG]: this.hFactory.from(0),
			[Length.SHORT]: this.hFactory.from(0),
		},
	});

	public minus(
		x: FrozenLike<H>,
		y?: FrozenLike<H>,
	): FrozenLike<H> {
		if (typeof y === 'undefined') {
			y = x;
			x = this.ZERO;
		}
		return this.frozenFactory.new({
			balance: {
				[Length.LONG]: x.balance[Length.LONG].minus(y.balance[Length.LONG]),
				[Length.SHORT]: x.balance[Length.SHORT].minus(y.balance[Length.SHORT]),
			},
			position: {
				[Length.LONG]: x.position[Length.LONG].minus(y.position[Length.LONG]),
				[Length.SHORT]: x.position[Length.SHORT].minus(y.position[Length.SHORT]),
			},
		});
	}
}
