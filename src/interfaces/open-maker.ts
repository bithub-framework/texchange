import {
	HLike, H, HStatic,
	OpenOrder, OpenOrderStatic,
} from 'secretary-like';
import { Frozen, FrozenStatic } from './frozen/frozen';


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

export class OpenMakerStatic<H extends HLike<H>> extends OpenOrderStatic<H>{
	public constructor(
		H: HStatic<H>,
		private Frozen: FrozenStatic<H>,
	) {
		super(H);
	}

	public capture(order: OpenMaker<H>): OpenMaker.Snapshot {
		return {
			...this.captureOpenOrder(order),
			behind: this.H.capture(order.behind),
			frozen: this.Frozen.capture(order.frozen),
		}
	}

	public restore(snapshot: OpenMaker.Snapshot): OpenMaker<H> {
		return {
			...this.restoreOpenOrder(snapshot),
			behind: this.H.restore(snapshot.behind),
			frozen: this.Frozen.restore(snapshot.frozen),
		}
	}

	public copy(order: OpenMaker<H>): OpenMaker<H> {
		return {
			...this.copyOpenOrder(order),
			behind: order.behind,
			frozen: order.frozen,
		};
	}
}
