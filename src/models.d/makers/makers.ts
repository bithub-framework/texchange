import {
	Side, Length,
	HLike, HStatic,
	OpenOrder,
	OpenOrderStatic,
	OrderId,
} from 'interfaces';
import { OpenMaker, OpenMakerStatic } from '../../interfaces/open-maker';
import { Frozen, FrozenStatic } from './frozen';
import { Context } from '../../context';
import assert = require('assert');
import { StatefulLike } from '../../stateful-like';



export abstract class Makers<H extends HLike<H>> implements
	StatefulLike<Makers.Snapshot>,
	Iterable<OpenMaker<H>> {

	private $orders = new Map<OrderId, OpenMaker<H>>();
	private $totalUnfilled: Makers.TotalUnfilled<H> = {
		[Side.ASK]: new this.context.H(0),
		[Side.BID]: new this.context.H(0),
	};

	protected Frozen = new FrozenStatic<H>(this.context.H);
	protected OpenOrder = new OpenOrderStatic<H>(
		this.context.H,
	);
	protected OpenMaker = new OpenMakerStatic<H>(
		this.context.H,
		this.Frozen,
	);
	protected TotalUnfilled = new Makers.TotalUnfilledStatic(this.context.H);

	private totalFrozen: Frozen<H> = this.Frozen.ZERO;

	public constructor(
		protected context: Context<H>,
	) { }

	public getTotalUnfilled(): Makers.TotalUnfilled.Functional<H> {
		return this.TotalUnfilled.copy(this.$totalUnfilled);
	}

	public getTotalFrozen(): Frozen<H> {
		return this.totalFrozen;
	}

	public [Symbol.iterator]() {
		return [...this.$orders.values()][Symbol.iterator]();
	}

	public getOrder(oid: OrderId): OpenMaker<H> {
		const $order = this.$getOrder(oid);
		return this.OpenMaker.copy($order);
	}

	protected $getOrder(oid: OrderId): OpenMaker<H> {
		const order = this.$orders.get(oid);
		assert(typeof order !== 'undefined');
		return order;
	}

	public capture(): Makers.Snapshot {
		return [...this.$orders.keys()].map(
			oid => this.OpenMaker.capture(this.$orders.get(oid)!),
		);
	}

	public restore(snapshot: Makers.Snapshot): void {
		for (const orderSnapshot of snapshot) {
			const order = this.OpenMaker.restore(orderSnapshot);
			this.$orders.set(order.id, order);
		}
		for (const side of [Side.ASK, Side.BID]) {
			this.$totalUnfilled[side] = [...this.$orders.values()]
				.filter(order => order.side === side)
				.reduce(
					(total, order) => total.plus(order.unfilled),
					new this.context.H(0),
				);
		}
		this.totalFrozen = [...this.$orders.values()]
			.reduce(
				(total, order) => this.Frozen.plus(total, order.frozen),
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

	protected abstract toFreeze(order: OpenOrder<H>): Frozen<H>;

	public appendOrder(
		order: OpenOrder<H>,
		behind: H,
	): void {
		assert(order.unfilled.gt(0));
		const toFreeze = this.normalizeFrozen(this.toFreeze(order));
		const $order: OpenMaker<H> = {
			...this.OpenOrder.copy(order),
			behind,
			frozen: toFreeze,
		};
		this.$orders.set(order.id, $order);
		this.totalFrozen = this.Frozen.plus(this.totalFrozen, toFreeze);
		this.$totalUnfilled[order.side] = this.$totalUnfilled[order.side]
			.plus(order.unfilled);
	}

	public takeOrder(oid: OrderId, volume: H): void {
		const $order = this.$getOrder(oid);
		assert(volume.lte($order.unfilled));
		assert($order.behind.eq(0));
		this.forcedlyRemoveOrder(oid);
		const newOrder: OpenOrder<H> = {
			...this.OpenOrder.copy($order),
			filled: $order.filled.plus(volume),
			unfilled: $order.unfilled.minus(volume),
		};
		if (newOrder.unfilled.gt(0))
			this.appendOrder(newOrder, new this.context.H(0));
	}

	public takeOrderQueue(oid: OrderId, volume?: H): void {
		const $order = this.$getOrder(oid);
		if (typeof volume !== 'undefined')
			assert(volume.lte($order.behind));
		$order.behind = typeof volume !== 'undefined'
			? $order.behind.minus(volume)
			: new this.context.H(0);
		this.$orders.set(oid, $order);
	}

	public removeOrder(oid: OrderId): void {
		const $order = this.$getOrder(oid);
		this.$orders.delete(oid);
		this.$totalUnfilled[$order.side] = this.$totalUnfilled[$order.side]
			.minus($order.unfilled);
		this.totalFrozen = this.Frozen.minus(this.totalFrozen, $order.frozen);
	}

	public forcedlyRemoveOrder(oid: OrderId): void {
		try {
			this.removeOrder(oid);
		} catch (err) { }
	}
}

export namespace Makers {
	export interface TotalUnfilled<H> {
		[side: Side]: H;
	}

	export namespace TotalUnfilled {
		export interface Functional<H> {
			readonly [side: Side]: H;
		}
	}

	export class TotalUnfilledStatic<H extends HLike<H>>{
		public constructor(
			private H: HStatic<H>,
		) { }

		public copy(
			totalUnfilled: TotalUnfilled<H> | TotalUnfilled.Functional<H>,
		): TotalUnfilled<H> | TotalUnfilled.Functional<H> {
			return {
				[Side.ASK]: totalUnfilled[Side.ASK],
				[Side.BID]: totalUnfilled[Side.BID],
			};
		}
	}

	export type Snapshot = readonly OpenMaker.Snapshot[];
}
