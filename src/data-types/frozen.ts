import {
	Length,
	HLike, HFactory,
	Position,
	PositionLike,
	PositionFactory,
} from 'secretary-like';
import {
	Balance,
	BalanceLike,
	BalanceFactory,
} from './balance';


export interface Frozen<H extends HLike<H>> {
	balance: BalanceLike<H>;
	position: PositionLike<H>;
}

export namespace Frozen {
	export interface Snapshot {
		readonly balance: Balance.Snapshot;
		readonly position: Position.Snapshot;
	}
}

export class FrozenFactory<H extends HLike<H>> {
	public constructor(
		private balanceFactory: BalanceFactory<H>,
		private positionFactory: PositionFactory<H>,
	) { }

	public capture(frozen: Frozen<H>): Frozen.Snapshot {
		return {
			balance: this.balanceFactory.capture(frozen.balance),
			position: this.positionFactory.capture(frozen.position),
		}
	}

	public restore(snapshot: Frozen.Snapshot): Frozen<H> {
		return {
			balance: this.balanceFactory.restore(snapshot.balance),
			position: this.positionFactory.restore(snapshot.position),
		}
	}
}

export class FrozenStatic<H extends HLike<H>> {
	public constructor(
		private hFactory: HFactory<H>,
		private balanceFactory: BalanceFactory<H>,
		private positionFactory: PositionFactory<H>,
	) { }

	public plus(x: Frozen<H>, y: Frozen<H>): Frozen<H> {
		return {
			balance: this.balanceFactory.new({
				[Length.LONG]: x.balance[Length.LONG].plus(y.balance[Length.LONG]),
				[Length.SHORT]: x.balance[Length.SHORT].plus(y.balance[Length.SHORT]),
			}),
			position: this.positionFactory.new({
				[Length.LONG]: x.position[Length.LONG].plus(y.position[Length.LONG]),
				[Length.SHORT]: x.position[Length.SHORT].plus(y.position[Length.SHORT]),
			}),
		}
	}

	public readonly ZERO: Frozen<H> = {
		balance: this.balanceFactory.new({
			[Length.LONG]: this.hFactory.from(0),
			[Length.SHORT]: this.hFactory.from(0),
		}),
		position: this.positionFactory.new({
			[Length.LONG]: this.hFactory.from(0),
			[Length.SHORT]: this.hFactory.from(0),
		}),
	};

	public minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H> {
		if (typeof y === 'undefined') {
			y = x;
			x = this.ZERO;
		}
		return {
			balance: this.balanceFactory.new({
				[Length.LONG]: x.balance[Length.LONG].minus(y.balance[Length.LONG]),
				[Length.SHORT]: x.balance[Length.SHORT].minus(y.balance[Length.SHORT]),
			}),
			position: this.positionFactory.new({
				[Length.LONG]: x.position[Length.LONG].minus(y.position[Length.LONG]),
				[Length.SHORT]: x.position[Length.SHORT].minus(y.position[Length.SHORT]),
			}),
		}
	}
}
