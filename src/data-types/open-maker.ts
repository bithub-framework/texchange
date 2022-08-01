import {
	HLike, H, HFactory,
	OpenOrder, OpenOrderFactory,
	Length, Side, Action,
	OrderId,
	CompositeDataFactoryLike,
	CompositeDataLike,
} from 'secretary-like';
import {
	FrozenFactory,
	Frozen,
} from './frozen';


export interface OpenMaker<H extends HLike<H>> extends
	OpenOrder<H>,
	OpenMaker.Source<H>,
	CompositeDataLike {
	behind: H;
	frozen: Frozen<H>;
}

class ConcreteOpenMaker<H extends HLike<H>> implements OpenMaker<H> {
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
		frozenFactory: FrozenFactory<H>,
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
		} = source);
		this.frozen = frozenFactory.create(source.frozen);
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
		frozen: Frozen.Source<H>;
	}

	export interface Snapshot extends OpenOrder.Snapshot {
		readonly behind: H.Snapshot;
		readonly frozen: Frozen.Snapshot;
	}
}

export class OpenMakerFactory<H extends HLike<H>> implements
	CompositeDataFactoryLike<
	OpenMaker.Source<H>,
	OpenMaker<H>,
	OpenMaker.Snapshot>
{
	public constructor(
		private hFactory: HFactory<H>,
		private frozenFactory: FrozenFactory<H>,
		private openOrderFactory: OpenOrderFactory<H>,
	) { }

	public create(source: OpenMaker.Source<H>): OpenMaker<H> {
		return new ConcreteOpenMaker(
			source,
			this,
			this.frozenFactory,
		);
	}

	public capture(order: OpenMaker<H>): OpenMaker.Snapshot {
		return {
			...this.openOrderFactory.capture(order),
			behind: this.hFactory.capture(order.behind),
			frozen: this.frozenFactory.capture(order.frozen),
		}
	}

	public restore(snapshot: OpenMaker.Snapshot): OpenMaker<H> {
		return this.create({
			...this.openOrderFactory.restore(snapshot),
			behind: this.hFactory.restore(snapshot.behind),
			frozen: this.frozenFactory.restore(snapshot.frozen),
		});
	}
}
