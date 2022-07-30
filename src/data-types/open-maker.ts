import {
	HLike, H, HFactory,
	OpenOrder, OpenOrderFactory, OpenOrderLike,
	Length, Side, Action,
	OrderId,
} from 'secretary-like';
import { Frozen, FrozenFactory } from './frozen';


export interface OpenMakerLike<H extends HLike<H>>
	extends OpenOrderLike<H>, OpenMaker.Source<H> {
	behind: H;
	frozen: Frozen<H>;
}

class OpenMaker<H extends HLike<H>> implements OpenMakerLike<H> {
	public price: H;
	public quantity: H;
	public side: Side;
	public length: Length;
	public action: Action;
	public filled: H;
	public unfilled: H;
	public id: OrderId;
	public behind: H;
	public frozen: Frozen<H>;

	public constructor(
		source: OpenMaker.Source<H>,
		private factory: OpenMakerFactory<H>,
	) {
		({
			price: this.price,
			quantity: this.quantity,
			side: this.side,
			length: this.length,
			action: this.action,
			filled: this.filled,
			unfilled: this.unfilled,
			id: this.id,
			behind: this.behind,
			frozen: this.frozen,
		} = source);
	}

	public toJSON(): unknown {
		return this.factory.capture(this);
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

export namespace OpenMaker {
	export interface Source<H extends HLike<H>> extends OpenOrder.Source<H> {
		behind: H;
		frozen: Frozen<H>;
	}

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

	public new(source: OpenMaker.Source<H>): OpenMaker<H> {
		return new OpenMaker(source, this);
	}

	public capture(order: OpenMakerLike<H>): OpenMaker.Snapshot {
		return {
			...this.openOrderFactory.capture(order),
			behind: this.hFactory.capture(order.behind),
			frozen: this.frozenFactory.capture(order.frozen),
		}
	}

	public restore(snapshot: OpenMaker.Snapshot): OpenMaker<H> {
		return this.new({
			...this.openOrderFactory.restore(snapshot),
			behind: this.hFactory.restore(snapshot.behind),
			frozen: this.frozenFactory.restore(snapshot.frozen),
		});
	}
}
