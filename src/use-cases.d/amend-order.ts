import {
	HLike,
	Amendment,
	OpenOrder,
} from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { Matcher } from '../middlewares/matcher';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseAmendOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.vmctx)
		private vmctx: VirtualMachineContextLike<H>,
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

	public amendOrder(amendment: Amendment<H>): OpenOrder<H> {
		let filled: H;
		try {
			filled = this.makers.getOrder(amendment.id).filled;
			this.makers.forcedlyRemoveOrder(amendment.id);
		} catch (err) {
			filled = amendment.quantity;
		}
		const order: OpenOrder<H> = this.vmctx.DataTypes.openOrderFactory.create({
			...amendment,
			filled,
			price: amendment.newPrice,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(filled),
		});
		this.validator.validateOrder(order);

		const $order = this.vmctx.DataTypes.openOrderFactory.create(order);
		const trades = this.matcher.$match($order);
		const maker = this.vmctx.DataTypes.openOrderFactory.create($order);
		const behind = this.book.lineUp(maker);
		this.makers.appendOrder(maker, behind);

		if (trades.length) {
			this.broadcast.emit('trades', trades);
			this.broadcast.emit('orderbook', this.book.getOrderbook());
			this.broadcast.emit('balances', this.calculator.getBalances());
			this.broadcast.emit('positions', this.calculator.getPositions());
		}
		return maker;
	}
}
