import {
	HLike, H, HFactory,
	OpenOrder, OpenOrderFactory,
} from 'secretary-like';
import { Frozen, FrozenFactory } from './frozen';


export interface OpenMaker<H extends HLike<H>> extends OpenOrder<H> {
	behind: H;
	frozen: Frozen<H>;
}

export namespace OpenMaker {
	export interface Snapshot extends OpenOrder.Snapshot {
		readonly behind: H.Snapshot;
		readonly frozen: Frozen.Snapshot;
	}
}

export class OpenMakerFactory<H extends HLike<H>>{
	public constructor(
		private hFactory: HFactory<H>,
		private frozenFactory: FrozenFactory<H>,
		private openOrderFactory: OpenOrderFactory<H>,
	) { }

	public capture(order: OpenMaker<H>): OpenMaker.Snapshot {
		return {
			...this.openOrderFactory.capture(order),
			behind: this.hFactory.capture(order.behind),
			frozen: this.frozenFactory.capture(order.frozen),
		}
	}

	public restore(snapshot: OpenMaker.Snapshot): OpenMaker<H> {
		return {
			...this.openOrderFactory.restore(snapshot),
			behind: this.hFactory.restore(snapshot.behind),
			frozen: this.frozenFactory.restore(snapshot.frozen),
		}
	}

	public copy(order: OpenMaker<H>): OpenMaker<H> {
		return {
			...this.openOrderFactory.copy(order),
			behind: order.behind,
			frozen: order.frozen,
		};
	}
}
