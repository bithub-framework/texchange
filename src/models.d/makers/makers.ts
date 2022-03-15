import {
	Side, Length,
	HLike,
	ConcreteOrderId,
	ConcreteOrderIdStatic,
	ConcreteOpenMakerStatic,
	ConcreteOpenMaker,
	ConcreteOpenOrder,
	OpenMaker,
} from 'interfaces';
import {
	Frozen,
	FrozenStatic,
} from './frozon';
import { Model } from '../../model';
import { Context } from '../../context';
import assert = require('assert');



export abstract class Makers<H extends HLike<H>>
	extends Model<H, Makers.Snapshot>
	implements Iterable<ConcreteOpenMaker<H>> {

	private orders = new Map<ConcreteOrderId, ConcreteOpenMaker<H>>();
	private frozens = new Map<ConcreteOrderId, Frozen<H>>();
	private totalUnfilled: Makers.TotalUnfilled.MutablePlain<H> = {
		[Side.ASK]: this.context.H.from(0),
		[Side.BID]: this.context.H.from(0),
	};

	protected readonly OrderId = new ConcreteOrderIdStatic();
	protected readonly OpenMaker = new ConcreteOpenMakerStatic<H>(
		this.context.H, this.OrderId,
	);
	protected readonly Frozen = new FrozenStatic<H>(this.context.H);

	protected constructor(
		protected readonly context: Context<H>,
	) { super(); }

	private totalFrozen: Frozen<H> = this.Frozen.ZERO;

	public getTotalUnfilled(): Makers.TotalUnfilled<H> {
		return this.totalUnfilled;
	}

	public getTotalFrozen(): Frozen<H> {
		return this.totalFrozen;
	}

	public [Symbol.iterator]() {
		return this.orders.values();
	}

	public getOrder(id: ConcreteOrderId): ConcreteOpenMaker<H> {
		const order = this.orders.get(id);
		assert(typeof order !== 'undefined');
		return order;
	}

	public capture(): Makers.Snapshot {
		return [...this.orders.keys()]
			.map(oid => ({
				order: this.OpenMaker.capture(this.orders.get(oid)!),
				frozen: this.Frozen.capture(this.frozens.get(oid)!),
			}));
	}

	public restore(snapshot: Makers.Snapshot): void {
		for (const {
			order: orderSnapshot,
			frozen: frozenSnapshot,
		} of snapshot) {
			const order = this.OpenMaker.restore(orderSnapshot);
			const frozen = this.Frozen.restore(frozenSnapshot);
			this.orders.set(order.id, order);
			this.frozens.set(order.id!, frozen);
		}
		for (const side of [Side.ASK, Side.BID]) {
			this.totalUnfilled[side] = [...this.orders.values()]
				.filter(order => order.side === side)
				.reduce(
					(total, order) => total.plus(order.unfilled),
					this.context.H.from(0),
				);
		}
		this.totalFrozen = [...this.frozens.values()]
			.reduce(
				(total, frozen) => this.Frozen.plus(total, frozen),
				this.Frozen.ZERO,
			);
	}

	private normalizeFrozen(frozen: Frozen<H>): Frozen<H> {
		return {
			balance: {
				[Length.LONG]: frozen.balance[Length.LONG].round(this.context.config.market.CURRENCY_DP),
				[Length.SHORT]: frozen.balance[Length.SHORT].round(this.context.config.market.CURRENCY_DP),
			},
			position: {
				[Length.LONG]: frozen.position[Length.LONG].round(this.context.config.market.QUANTITY_DP),
				[Length.SHORT]: frozen.position[Length.SHORT].round(this.context.config.market.QUANTITY_DP),
			},
		};
	}

	protected abstract toFreeze(order: ConcreteOpenOrder<H>): Frozen<H>;

	public appendOrder(order: ConcreteOpenMaker<H>): void {
		assert(order.unfilled.gt(0));
		const toFreeze = this.normalizeFrozen(
			this.toFreeze(order),
		);
		this.orders.set(order.id, order);
		this.frozens.set(order.id, toFreeze);
		this.totalFrozen = this.Frozen.plus(this.totalFrozen, toFreeze);
		this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
			.plus(order.unfilled);
	}

	public takeOrder(oid: ConcreteOrderId, volume: H): void {
		const order = this.getOrder(oid);
		assert(volume.lte(order.unfilled));
		assert(order.behind.eq(0));
		this.forcedlyRemoveOrder(oid);
		const newOrder: ConcreteOpenMaker<H> = {
			id: order.id,
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			behind: order.behind,
			filled: order.filled.plus(volume),
			unfilled: order.unfilled.minus(volume),
		};
		this.appendOrder(newOrder);
	}

	public takeOrderQueue(oid: ConcreteOrderId, volume?: H): void {
		const order = this.getOrder(oid);
		const newOrder: ConcreteOpenMaker<H> = {
			id: order.id,
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			filled: order.filled,
			unfilled: order.unfilled,
			behind: typeof volume !== 'undefined'
				? order.behind.minus(volume)
				: this.context.H.from(0),
		};
		this.orders.set(oid, newOrder);
	}

	public removeOrder(oid: ConcreteOrderId): void {
		const order = this.getOrder(oid);
		const toThaw = this.frozens.get(oid)!;
		this.orders.delete(oid);
		this.frozens.delete(oid);
		this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
			.minus(order.unfilled);
		this.totalFrozen = this.Frozen.minus(this.totalFrozen, toThaw);
	}

	public forcedlyRemoveOrder(oid: ConcreteOrderId): void {
		try {
			this.removeOrder(oid);
		} catch (err) { }
	}
}





export namespace Makers {
	export interface TotalUnfilled<H> {
		readonly [side: Side]: H;
	}
	export namespace TotalUnfilled {
		export interface MutablePlain<H> {
			[side: Side]: H;
		}
	}

	export type Snapshot = {
		order: OpenMaker.Snapshot;
		frozen: Frozen.Snapshot;
	}[];
}
