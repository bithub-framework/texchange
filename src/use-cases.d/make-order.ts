import { Context } from '../context';
import {
	LimitOrder,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Progress } from '../models.d/progress';
import { Book } from '../models.d/book';
import { UserOrderHandler } from '../middlewares/user-order-handler';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';

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
		@inject(TYPES.MIDDLEWARES.userOrderHandler)
		private userOrderhandler: UserOrderHandler<H>,
		@inject(TYPES.MIDDLEWARES.orderValidator)
		private validator: OrderValidator<H>,
		@inject(TYPES.MIDDLEWARES.broadcast)
		private broadcast: Broadcast<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
	) { }

	public makeOrder(limitOrder: LimitOrder<H>): OpenOrder<H> {
		const order: OpenOrder<H> = {
			...limitOrder,
			id: ++this.progress.userOrderCount,
			filled: new this.context.Data.H(0),
			unfilled: limitOrder.quantity,
		}
		this.validator.validateOrder(order);
		const $order = this.context.Data.OpenOrder.copy(order);
		const trades = this.userOrderhandler.$makeOpenOrder($order);
		if (trades.length) {
			this.broadcast.emit('trades', trades);
			this.broadcast.emit('orderbook', this.book.getBook());
			this.broadcast.emit('balances', this.calculator.getBalances());
			this.broadcast.emit('positions', this.calculator.getPositions());
		}
		return this.context.Data.OpenOrder.copy($order);
	}
}
