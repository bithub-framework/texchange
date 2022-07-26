import { Context } from '../context';
import {
	LimitOrder,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Progress } from '../models.d/progress';
import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { Matcher } from '../middlewares/matcher';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseMakeOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.MODELS.book)
		private book: Book<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
		@inject(TYPES.MIDDLEWARES.orderValidator)
		private validator: OrderValidator<H>,
		@inject(TYPES.MIDDLEWARES.broadcast)
		private broadcast: Broadcast<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
		@inject(TYPES.MIDDLEWARES.matcher)
		private matcher: Matcher<H>,
	) { }

	public makeOrder(limitOrder: LimitOrder<H>): OpenOrder<H> {
		const order: OpenOrder<H> = {
			...limitOrder,
			id: ++this.progress.userOrderCount,
			filled: this.context.Data.hFactory.from(0),
			unfilled: limitOrder.quantity,
		}
		this.validator.validateOrder(order);

		const $order = this.context.Data.openOrderFactory.copy(order);
		const trades = this.matcher.$match($order);
		const maker = this.context.Data.openOrderFactory.copy($order);
		if ($order.unfilled.gt(0)) {
			const behind = this.book.lineUp(maker);
			this.makers.appendOrder(maker, behind);
		}

		if (trades.length) {
			this.broadcast.emit('trades', trades);
			this.broadcast.emit('orderbook', this.book.getOrderbook());
			this.broadcast.emit('balances', this.calculator.getBalances());
			this.broadcast.emit('positions', this.calculator.getPositions());
		}
		return maker;
	}
}
