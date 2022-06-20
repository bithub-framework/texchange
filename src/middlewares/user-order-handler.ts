import {
	HLike, H,
	OpenOrder,
	Trade,
	Side, Operation,
} from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { MarketSpec } from 'secretary-like';
import { AccountSpec } from 'secretary-like';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { AvailableAssetsCalculator } from './available-assets-calculator/available-assets-calculator';
import { OrderValidator } from './order-validator';

import { TYPES } from '../injection/types';
import { inject } from '@zimtsui/injektor';


export class UserOrderHandler<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.MODELS.book)
		private book: Book<H>,
		@inject(TYPES.MODELS.marginAssets)
		private marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
		@inject(TYPES.broadcast)
		private broadcast: Broadcast<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
		@inject(TYPES.MIDDLEWARES.orderValidator)
		private validator: OrderValidator<H>,
	) { }

	public makeOpenOrder(order: OpenOrder<H>): OpenOrder<H> {
		this.validator.validateOrder(order);
		const $order = this.context.Data.OpenOrder.copy(order);
		const trades = this.$orderTakes($order);
		this.orderMakes($order);
		if (trades.length) {
			this.broadcast.emit('trades', trades);
			this.broadcast.emit('orderbook', this.book.getBook());
			this.broadcast.emit('balances', this.calculator.getBalances());
			this.broadcast.emit('positions', this.calculator.getPositions());
		}
		return $order;
	}

	private $orderTakes($taker: OpenOrder<H>): Trade<H>[] {
		const orderbook = this.book.getBook();

		const trades: Trade<H>[] = [];
		let volume = new this.context.Data.H(0);
		let dollarVolume = new this.context.Data.H(0);
		for (const maker of orderbook[-$taker.side])
			if (
				(
					$taker.side === Side.BID && $taker.price.gte(maker.price) ||
					$taker.side === Side.ASK && $taker.price.lte(maker.price)
				) && $taker.unfilled.gt(0)
			) {
				const quantity = this.context.Data.H.min($taker.unfilled, maker.quantity);
				this.book.decQuantity(maker.side, maker.price, quantity);
				$taker.filled = $taker.filled.plus(quantity);
				$taker.unfilled = $taker.unfilled.minus(quantity);
				volume = volume.plus(quantity);
				dollarVolume = dollarVolume
					.plus(this.marketSpec.dollarVolume(maker.price, quantity))
					.round(this.marketSpec.CURRENCY_DP);
				trades.push({
					side: $taker.side,
					price: maker.price,
					quantity,
					time: this.context.timeline.now(),
					id: ++this.progress.userTradeCount,
				});
			}

		this.marginAssets.pay(
			dollarVolume
				.times(this.accountSpec.TAKER_FEE_RATE)
				.round(
					this.marketSpec.CURRENCY_DP,
					H.RoundingMode.HALF_AWAY_FROM_ZERO,
				),
		);
		if ($taker.operation === Operation.OPEN)
			this.marginAssets.open({
				length: $taker.length,
				volume,
				dollarVolume,
			});
		else
			this.marginAssets.close({
				length: $taker.length,
				volume,
				dollarVolume,
			});

		return trades;
	}

	private orderMakes(
		order: OpenOrder<H>,
	): void {
		const makers = this.book.getBook()[order.side];
		let behind = new this.context.Data.H(0);
		for (const maker of makers)
			if (maker.price.eq(order.price))
				behind = behind.plus(maker.quantity);
		this.makers.appendOrder(order, behind);
	}

	public cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H> {
		let filled: H;
		try {
			filled = this.makers.getOrder(order.id).filled;
			this.makers.forcedlyRemoveOrder(order.id);
		} catch (err) {
			filled = order.quantity;
		}

		return {
			...order,
			filled,
			unfilled: order.quantity.minus(filled),
		};
	}
}