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
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { Matcher } from '../middlewares/matcher';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseUpdateOrderbook<H extends HLike<H>>{
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.MODELS.book)
		private book: Book<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
		@inject(TYPES.MIDDLEWARES.broadcast)
		private broadcast: Broadcast<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
		@inject(TYPES.MIDDLEWARES.matcher)
		private matcher: Matcher<H>,
	) { }

	public updateOrderbook(orderbook: DatabaseOrderbook<H>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.progress.updateDatabaseOrderbook(orderbook);
		this.book.setBasebook(orderbook);

		const orders = [...this.makers];
		for (const order of orders)
			this.makers.removeOrder(order.id);
		const allTrades: Trade<H>[] = [];
		for (const order of orders) {
			const $order = this.context.Data.OpenOrder.copy(order);
			const trades = this.matcher.$match($order);
			const maker = this.context.Data.OpenOrder.copy($order);
			const behind = this.book.lineUp(maker);
			this.makers.appendOrder(maker, behind);

			allTrades.push(...trades);
		}
		if (allTrades.length) {
			this.broadcast.emit('trades', allTrades);
			this.broadcast.emit('balances', this.calculator.getBalances());
			this.broadcast.emit('positions', this.calculator.getPositions());
		}
		this.broadcast.emit('orderbook', this.book.getOrderbook());
	}
}
