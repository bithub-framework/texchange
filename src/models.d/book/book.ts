import {
	OrderbookLike,
	Orderbook,
	OpenOrderLike,
	Side,
	HLike,
	MarketSpecLike,
} from 'secretary-like';
import assert = require('assert');
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
import { Decrements, DecrementsFactory } from './decrements';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';



export class Book<H extends HLike<H>> implements StatefulLike<Book.Snapshot> {
	private Decrements = new DecrementsFactory<H>(this.context.DataTypes.hFactory);

	private time = Number.NEGATIVE_INFINITY;
	private basebook: OrderbookLike<H> = this.context.DataTypes.orderbookFactory.new({
		[Side.BID]: [],
		[Side.ASK]: [],
		time: Number.NEGATIVE_INFINITY,
	});
	private decrements: Decrements<H> = {
		[Side.BID]: new Map<string, H>(),
		[Side.ASK]: new Map<string, H>(),
	};
	private finalbookCache: OrderbookLike<H> | null = null;

	public constructor(
		@inject(TYPES.vmctx)
		private context: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpecLike<H>,
	) {
	}

	public setBasebook(basebook: OrderbookLike<H>): void {
		assert(basebook.time === this.context.timeline.now());
		this.basebook = basebook;
		this.time = basebook.time;
		this.finalbookCache = null;
	}

	public decQuantity(
		side: Side,
		price: H,
		decrement: H,
	): void {
		assert(decrement.gt(0));
		const priceString = price.toFixed(this.marketSpec.PRICE_SCALE);
		const oldTotalDecrement = this.decrements[side].get(priceString)
			|| this.context.DataTypes.hFactory.from(0);
		const newTotalDecrement = oldTotalDecrement.plus(decrement);
		this.decrements[side].set(priceString, newTotalDecrement);
		this.time = this.context.timeline.now();
		this.finalbookCache = null;
	}

	private tryApply(): OrderbookLike<H> {
		if (this.finalbookCache) return this.finalbookCache;

		const $final = this.context.DataTypes.orderbookFactory.new({
			[Side.BID]: [],
			[Side.ASK]: [],
			time: this.time,
		});
		const $total: Decrements<H> = {
			[Side.BID]: new Map<string, H>(),
			[Side.ASK]: new Map<string, H>(),
		};
		for (const side of [Side.BID, Side.ASK]) {
			for (const order of this.basebook[side])
				$total[side].set(
					order.price.toFixed(this.marketSpec.PRICE_SCALE),
					order.quantity,
				);
			for (const [priceString, decrement] of this.decrements[side]) {
				let quantity = $total[side].get(priceString);
				if (typeof quantity !== 'undefined') {
					quantity = quantity.minus(decrement);
					if (quantity.lte(0)) $total[side].delete(priceString);
					else $total[side].set(priceString, quantity);
				} else this.decrements[side].delete(priceString);
			}
			// 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
			$final[side] = [...$total[side]].map(
				([priceString, quantity]) => this.context.DataTypes.bookOrderFactory.new({
					price: this.context.DataTypes.hFactory.from(priceString),
					quantity,
					side,
				}),
			);
		}
		return this.finalbookCache = $final;
	}

	public getOrderbook(): OrderbookLike<H> {
		return this.tryApply();
	}

	public lineUp(order: OpenOrderLike<H>): H {
		const makers = this.getOrderbook()[order.side];
		let behind = this.context.DataTypes.hFactory.from(0);
		for (const maker of makers)
			if (maker.price.eq(order.price))
				behind = behind.plus(maker.quantity);
		return behind;
	}

	public capture(): Book.Snapshot {
		return {
			basebook: this.context.DataTypes.orderbookFactory.capture(this.basebook),
			decrements: this.Decrements.capture(this.decrements),
			time: Number.isFinite(this.time)
				? this.time
				: null,
		}
	}

	public restore(snapshot: Book.Snapshot): void {
		this.basebook = this.context.DataTypes.orderbookFactory.restore(snapshot.basebook);
		this.decrements = this.Decrements.restore(snapshot.decrements);
		this.time = snapshot.time === null
			? Number.NEGATIVE_INFINITY
			: snapshot.time;
		this.finalbookCache = null;
	}
}

export namespace Book {
	export interface Snapshot {
		basebook: Orderbook.Snapshot;
		decrements: Decrements.Snapshot;
		time: Orderbook.Snapshot['time'];
	}
}
