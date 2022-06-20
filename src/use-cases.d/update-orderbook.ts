import { Context } from '../context';
import { Broadcast } from '../middlewares/broadcast';
import {
	HLike,
	Trade,
} from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import assert = require('assert');
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Makers } from '../models.d/makers/makers';
import { UserOrderHandler } from '../middlewares/user-order-handler';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseUpdateOrderbook<H extends HLike<H>>{
	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.MODELS.book)
		protected book: Book<H>,
		@inject(TYPES.MODELS.progress)
		protected progress: Progress<H>,
		@inject(TYPES.MODELS.makers)
		protected makers: Makers<H>,
		@inject(TYPES.MIDDLEWARES.userOrderHandler)
		protected userOrderHandler: UserOrderHandler<H>,
		@inject(TYPES.MIDDLEWARES.broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
	) { }

	public updateOrderbook(orderbook: DatabaseOrderbook<H>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.progress.updateDatabaseOrderbook(orderbook);
		this.book.setBasebook(orderbook);

		const makers = [...this.makers];
		for (const maker of makers)
			this.makers.removeOrder(maker.id);
		const allTrades: Trade<H>[] = [];
		for (const maker of makers) {
			const $maker = this.context.Data.OpenOrder.copy(maker);
			const trades = this.userOrderHandler.$makeOpenOrder($maker);
			allTrades.push(...trades);
		}
		if (allTrades.length) {
			this.broadcast.emit('trades', allTrades);
			this.broadcast.emit('balances', this.calculator.getBalances());
			this.broadcast.emit('positions', this.calculator.getPositions());
		}
		this.broadcast.emit('orderbook', this.book.getBook());
	}
}
