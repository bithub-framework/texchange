import {
	HLike, H, HStatic,
	OpenOrder, OpenOrderStatic,
} from 'secretary-like';
import { Frozen, FrozenStatic } from './frozen';


export interface OpenMaker<H extends HLike<H>>
	extends OpenOrder<H> {

	behind: H;
	frozen: Frozen<H>;
}

export namespace OpenMaker {
	export interface Snapshot extends OpenOrder.Snapshot {
		readonly behind: H.Snapshot;
		readonly frozen: Frozen.Snapshot;
	}
}

export class OpenMakerStatic<H extends HLike<H>> {
	private readonly OpenOrder = new OpenOrderStatic(this.H);

	public constructor(
		private H: HStatic<H>,
		private Frozen: FrozenStatic<H>,
	) { }

	public capture(order: OpenMaker<H>): OpenMaker.Snapshot {
		return {
			...this.OpenOrder.capture(order),
			behind: this.H.capture(order.behind),
			frozen: this.Frozen.capture(order.frozen),
		}
	}

	public restore(snapshot: OpenMaker.Snapshot): OpenMaker<H> {
		return {
			...this.OpenOrder.restore(snapshot),
			behind: this.H.restore(snapshot.behind),
			frozen: this.Frozen.restore(snapshot.frozen),
		}
	}

	public copy(order: OpenMaker<H>): OpenMaker<H> {
		return {
			...this.OpenOrder.copy(order),
			behind: order.behind,
			frozen: order.frozen,
		};
	}
}
