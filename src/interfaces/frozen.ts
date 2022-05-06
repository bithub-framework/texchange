import {
	Length,
	HLike, H, HStatic,
} from 'secretary-like';


export interface Frozen<H> {
	readonly balance: {
		readonly [length: Length]: H;
	};
	readonly position: {
		readonly [length: Length]: H;
	};
}

export namespace Frozen {
	export interface Snapshot {
		readonly balance: {
			readonly [length: Length]: H.Snapshot;
		};
		readonly position: {
			readonly [length: Length]: H.Snapshot;
		};
	}
}

export class FrozenStatic<H extends HLike<H>> {
	public constructor(
		private H: HStatic<H>,
	) { }

	public plus(x: Frozen<H>, y: Frozen<H>): Frozen<H> {
		return {
			balance: {
				[Length.LONG]: x.balance[Length.LONG].plus(y.balance[Length.LONG]),
				[Length.SHORT]: x.balance[Length.SHORT].plus(y.balance[Length.SHORT]),
			},
			position: {
				[Length.LONG]: x.position[Length.LONG].plus(y.position[Length.LONG]),
				[Length.SHORT]: x.position[Length.SHORT].plus(y.position[Length.SHORT]),
			},
		}
	}

	public ZERO: Frozen<H> = {
		balance: {
			[Length.LONG]: new this.H(0),
			[Length.SHORT]: new this.H(0),
		},
		position: {
			[Length.LONG]: new this.H(0),
			[Length.SHORT]: new this.H(0),
		},
	};

	public minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H> {
		if (typeof y === 'undefined') {
			y = x;
			x = this.ZERO;
		}
		return {
			balance: {
				[Length.LONG]: x.balance[Length.LONG].minus(y.balance[Length.LONG]),
				[Length.SHORT]: x.balance[Length.SHORT].minus(y.balance[Length.SHORT]),
			},
			position: {
				[Length.LONG]: x.position[Length.LONG].minus(y.position[Length.LONG]),
				[Length.SHORT]: x.position[Length.SHORT].minus(y.position[Length.SHORT]),
			},
		}
	}

	public capture(frozen: Frozen<H>): Frozen.Snapshot {
		return {
			balance: {
				[Length.LONG]: this.H.capture(frozen.balance[Length.LONG]),
				[Length.SHORT]: this.H.capture(frozen.balance[Length.SHORT]),
			},
			position: {
				[Length.LONG]: this.H.capture(frozen.position[Length.LONG]),
				[Length.SHORT]: this.H.capture(frozen.position[Length.SHORT]),
			},
		}
	}

	public restore(snapshot: Frozen.Snapshot): Frozen<H> {
		return {
			balance: {
				[Length.LONG]: this.H.restore(snapshot.balance[Length.LONG]),
				[Length.SHORT]: this.H.restore(snapshot.balance[Length.SHORT]),
			},
			position: {
				[Length.LONG]: this.H.restore(snapshot.position[Length.LONG]),
				[Length.SHORT]: this.H.restore(snapshot.position[Length.SHORT]),
			},
		}
	}
}
