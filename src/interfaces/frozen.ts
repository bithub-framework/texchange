import {
	Length,
	HLike, HFactory,
	Position, PositionFactory,
} from 'secretary-like';
import { Balance, BalanceFactory } from './balance';


export interface Frozen<H extends HLike<H>> {
	balance: Balance<H>;
	position: Position<H>;
}

export namespace Frozen {
	export interface Snapshot {
		readonly balance: Balance.Snapshot;
		readonly position: Position.Snapshot;
	}
}

export class FrozenFactory<H extends HLike<H>> {
	private positionFactory = new PositionFactory<H>(this.hFactory);
	private balanceFactory = new BalanceFactory(this.hFactory);

	public constructor(
		private hFactory: HFactory<H>,
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
	) { }

	public plus(x: Frozen<H>, y: Frozen<H>): Frozen<H> {
		return {
			balance: new Balance(
				x.balance.get(Length.LONG).plus(y.balance.get(Length.LONG)),
				x.balance.get(Length.SHORT).plus(y.balance.get(Length.SHORT)),
			),
			position: new Position(
				x.position.get(Length.LONG).plus(y.position.get(Length.LONG)),
				x.position.get(Length.SHORT).plus(y.position.get(Length.SHORT)),
			),
		}
	}

	public readonly ZERO: Frozen<H> = {
		balance: new Balance(
			this.hFactory.from(0),
			this.hFactory.from(0),
		),
		position: new Position(
			this.hFactory.from(0),
			this.hFactory.from(0),
		),
	};

	public minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H> {
		if (typeof y === 'undefined') {
			y = x;
			x = this.ZERO;
		}
		return {
			balance: new Balance(
				x.balance.get(Length.LONG).minus(y.balance.get(Length.LONG)),
				x.balance.get(Length.SHORT).minus(y.balance.get(Length.SHORT)),
			),
			position: new Position(
				x.position.get(Length.LONG).minus(y.position.get(Length.LONG)),
				x.position.get(Length.SHORT).minus(y.position.get(Length.SHORT)),
			),
		}
	}
}
