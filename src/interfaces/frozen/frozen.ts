import {
	Length,
	HLike, HStatic,
	Position, PositionStatic,
} from 'secretary-like';
import { FrozenBalance, FrozenBalanceStatic } from './frozen-balance';


export interface Frozen<H extends HLike<H>> {
	readonly balance: FrozenBalance<H>;
	readonly position: Position<H>;
}

export namespace Frozen {
	export interface Snapshot {
		readonly balance: FrozenBalance.Snapshot;
		readonly position: Position.Snapshot;
	}
}

export class FrozenStatic<H extends HLike<H>> {
	private Position = new PositionStatic<H>(this.H);
	private FrozenBalance = new FrozenBalanceStatic(this.H);

	public constructor(
		private H: HStatic<H>,
	) { }

	public plus(x: Frozen<H>, y: Frozen<H>): Frozen<H> {
		return {
			balance: new FrozenBalance(
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
		balance: new FrozenBalance(
			this.H.from(0),
			this.H.from(0),
		),
		position: new Position(
			this.H.from(0),
			this.H.from(0),
		),
	};

	public minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H> {
		if (typeof y === 'undefined') {
			y = x;
			x = this.ZERO;
		}
		return {
			balance: new FrozenBalance(
				x.balance.get(Length.LONG).minus(y.balance.get(Length.LONG)),
				x.balance.get(Length.SHORT).minus(y.balance.get(Length.SHORT)),
			),
			position: new Position(
				x.position.get(Length.LONG).minus(y.position.get(Length.LONG)),
				x.position.get(Length.SHORT).minus(y.position.get(Length.SHORT)),
			),
		}
	}

	public capture(frozen: Frozen<H>): Frozen.Snapshot {
		return {
			balance: this.FrozenBalance.capture(frozen.balance),
			position: this.Position.capture(frozen.position),
		}
	}

	public restore(snapshot: Frozen.Snapshot): Frozen<H> {
		return {
			balance: this.FrozenBalance.restore(snapshot.balance),
			position: this.Position.restore(snapshot.position),
		}
	}
}
