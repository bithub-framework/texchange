import {
	Side, Length,
	HLike,
	Position,
	OpenOrder,
	OrderId,
	MarketSpec,
} from 'secretary-like';
import { OpenMaker } from '../../data-types/open-maker';
import { Frozen } from '../../data-types/frozen';
import { Balance } from '../../data-types/balance';
import { TotalUnfilled, TotalUnfilledFactory } from './total-unfilled';
import { Context } from '../../context';
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
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpec<H>,
	) {
		this.$totalUnfilled = new TotalUnfilled<H>(
			context.dataTypes.hFactory.from(0),
			context.dataTypes.hFactory.from(0),
		);
		this.totalUnfilledFactory = new TotalUnfilledFactory();
		this.totalFrozen = context.dataTypes.Frozen.ZERO;
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
		return this.context.dataTypes.OpenMaker.copy($order);
	}

	protected $getOrder(oid: OrderId): OpenMaker<H> {
		const order = this.$orders.get(oid);
		assert(typeof order !== 'undefined');
		return order;
	}

	public capture(): Makers.Snapshot {
		return [...this.$orders.keys()].map(
			oid => this.context.dataTypes.OpenMaker.capture(this.$orders.get(oid)!),
		);
	}

	public restore(snapshot: Makers.Snapshot): void {
		for (const orderSnapshot of snapshot) {
			const order = this.context.dataTypes.OpenMaker.restore(orderSnapshot);
			this.$orders.set(order.id, order);
		}
		for (const side of [Side.ASK, Side.BID]) {
			this.$totalUnfilled.set(
				side,
				[...this.$orders.values()]
					.filter(order => order.side === side)
					.reduce(
						(total, order) => total.plus(order.unfilled),
						this.context.dataTypes.hFactory.from(0),
					),
			);
		}
		this.totalFrozen = [...this.$orders.values()]
			.reduce(
				(total, order) => this.context.dataTypes.Frozen.plus(total, order.frozen),
				this.context.dataTypes.Frozen.ZERO,
			);
	}

	private normalizeFrozen(frozen: Frozen<H>): Frozen<H> {
		return {
			balance: new Balance<H>(
				frozen.balance.get(Length.LONG).round(this.marketSpec.CURRENCY_DP),
				frozen.balance.get(Length.SHORT).round(this.marketSpec.CURRENCY_DP),
			),
			position: new Position<H>(
				frozen.position.get(Length.LONG).round(this.marketSpec.QUANTITY_DP),
				frozen.position.get(Length.SHORT).round(this.marketSpec.QUANTITY_DP),
			),
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
			...this.context.dataTypes.openOrderFactory.copy(order),
			behind,
			frozen: toFreeze,
		};
		this.$orders.set(order.id, $order);
		this.totalFrozen = this.context.dataTypes.Frozen.plus(this.totalFrozen, toFreeze);
		this.$totalUnfilled.set(
			order.side,
			this.$totalUnfilled.get(order.side)
				.plus(order.unfilled),
		);
	}

	public takeOrder(oid: OrderId, volume: H): void {
		const $order = this.$getOrder(oid);
		assert(volume.lte($order.unfilled));
		assert($order.behind.eq(0));
		this.forcedlyRemoveOrder(oid);
		const newOrder: OpenOrder<H> = {
			...this.context.dataTypes.openOrderFactory.copy($order),
			filled: $order.filled.plus(volume),
			unfilled: $order.unfilled.minus(volume),
		};
		if (newOrder.unfilled.gt(0))
			this.appendOrder(newOrder, this.context.dataTypes.hFactory.from(0));
	}

	public takeOrderQueue(oid: OrderId, volume?: H): void {
		const $order = this.$getOrder(oid);
		if (typeof volume !== 'undefined')
			assert(volume.lte($order.behind));
		$order.behind = typeof volume !== 'undefined'
			? $order.behind.minus(volume)
			: this.context.dataTypes.hFactory.from(0);
		this.$orders.set(oid, $order);
	}

	public removeOrder(oid: OrderId): void {
		const $order = this.$getOrder(oid);
		this.$orders.delete(oid);
		this.$totalUnfilled.set(
			$order.side,
			this.$totalUnfilled.get($order.side)
				.minus($order.unfilled),
		);
		this.totalFrozen = this.context.dataTypes.Frozen.minus(this.totalFrozen, $order.frozen);
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
