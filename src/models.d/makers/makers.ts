import {
	Side,
	HLike,
	OpenOrder,
	OrderId,
	MarketSpec,
	AccountSpec,
} from 'secretary-like';
import { OpenMaker } from '../../data-types/open-maker';
import { Frozen } from '../../data-types/frozen';
import { TotalUnfilled, TotalUnfilledFactory } from './total-unfilled';
import { VirtualMachineContextLike } from '../../vmctx';
import assert = require('assert');
import { StatefulLike } from '../../stateful-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';



export abstract class Makers<H extends HLike<H>> implements
	StatefulLike<Makers.Snapshot>,
	Iterable<OpenMaker<H>> {

	private $orders = new Map<OrderId, OpenMaker<H>>();
	private $totalUnfilled: TotalUnfilled<H>;

	protected totalUnfilledFactory: TotalUnfilledFactory<H>;
	private totalFrozen: Frozen<H>;

	public constructor(
		@inject(TYPES.vmctx)
		protected context: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		protected accountSpec: AccountSpec,
	) {
		this.$totalUnfilled = {
			[Side.BID]: context.DataTypes.hFactory.from(0),
			[Side.ASK]: context.DataTypes.hFactory.from(0),
		};
		this.totalUnfilledFactory = new TotalUnfilledFactory();
		this.totalFrozen = context.DataTypes.Frozen.ZERO;
	}

	public getTotalUnfilled(): TotalUnfilled<H> {
		return this.totalUnfilledFactory.copy(this.$totalUnfilled);
	}

	public getTotalFrozen(): Frozen<H> {
		return this.totalFrozen;
	}

	public [Symbol.iterator]() {
		return [...this.$orders.values()][Symbol.iterator]();
	}

	public getOrder(oid: OrderId): OpenMaker<H> {
		const $order = this.$getOrder(oid);
		return this.context.DataTypes.openMakerFactory.new($order);
	}

	protected $getOrder(oid: OrderId): OpenMaker<H> {
		const order = this.$orders.get(oid);
		assert(typeof order !== 'undefined');
		return order;
	}

	public capture(): Makers.Snapshot {
		return [...this.$orders.keys()].map(
			oid => this.context.DataTypes.openMakerFactory.capture(this.$orders.get(oid)!),
		);
	}

	public restore(snapshot: Makers.Snapshot): void {
		for (const orderSnapshot of snapshot) {
			const order = this.context.DataTypes.openMakerFactory.restore(orderSnapshot);
			this.$orders.set(order.id, order);
		}
		for (const side of [Side.ASK, Side.BID]) {
			this.$totalUnfilled[side] = [...this.$orders.values()]
				.filter(order => order.side === side)
				.reduce(
					(total, order) => total.plus(order.unfilled),
					this.context.DataTypes.hFactory.from(0),
				);
		}
		this.totalFrozen = [...this.$orders.values()]
			.reduce(
				(total, order) => this.context.DataTypes.Frozen.plus(total, order.frozen),
				this.context.DataTypes.Frozen.ZERO,
			);
	}

	protected abstract toFreeze(order: OpenOrder<H>): Frozen<H>;

	public appendOrder(
		order: OpenOrder<H>,
		behind: H,
	): void {
		assert(order.unfilled.gt(0));
		const toFreeze = this.toFreeze(order);
		const $order = this.context.DataTypes.openMakerFactory.new({
			price: order.price,
			quantity: order.quantity,
			length: order.length,
			side: order.side,
			action: order.action,
			filled: order.filled,
			unfilled: order.unfilled,
			id: order.id,
			behind,
			frozen: toFreeze,
		});
		this.$orders.set(order.id, $order);
		this.totalFrozen = this.context.DataTypes.Frozen.plus(this.totalFrozen, toFreeze);
		this.$totalUnfilled[order.side] = this.$totalUnfilled[order.side]
			.plus(order.unfilled);
	}

	public takeOrder(oid: OrderId, volume: H): void {
		const $order = this.$getOrder(oid);
		assert(volume.lte($order.unfilled));
		assert($order.behind.eq(0));
		this.forcedlyRemoveOrder(oid);
		const newOrder = this.context.DataTypes.openOrderFactory.new({
			price: $order.price,
			quantity: $order.quantity,
			length: $order.length,
			side: $order.side,
			action: $order.action,
			id: $order.id,
			filled: $order.filled.plus(volume),
			unfilled: $order.unfilled.minus(volume),
		});
		if (newOrder.unfilled.gt(0))
			this.appendOrder(newOrder, this.context.DataTypes.hFactory.from(0));
	}

	public takeOrderQueue(oid: OrderId, volume?: H): void {
		const $order = this.$getOrder(oid);
		if (typeof volume !== 'undefined')
			assert(volume.lte($order.behind));
		$order.behind = typeof volume !== 'undefined'
			? $order.behind.minus(volume)
			: this.context.DataTypes.hFactory.from(0);
		this.$orders.set(oid, $order);
	}

	public removeOrder(oid: OrderId): void {
		const $order = this.$getOrder(oid);
		this.$orders.delete(oid);
		this.$totalUnfilled[$order.side] = this.$totalUnfilled[$order.side]
			.minus($order.unfilled);
		this.totalFrozen = this.context.DataTypes.Frozen.minus(this.totalFrozen, $order.frozen);
	}

	public forcedlyRemoveOrder(oid: OrderId): void {
		try {
			this.removeOrder(oid);
		} catch (err) { }
	}
}

export namespace Makers {
	export type Snapshot = readonly OpenMaker.Snapshot[];
}
