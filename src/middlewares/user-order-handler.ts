import {
	HLike,
	OpenOrder,
	Trade,
} from 'secretary-like';
import { Context } from '../context';
import { MarketSpec } from 'secretary-like';
import { AccountSpec } from 'secretary-like';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { Matcher } from './matcher';

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
		@inject(TYPES.MIDDLEWARES.matcher)
		private matcher: Matcher<H>,
	) { }

	public $makeOpenOrder($order: OpenOrder<H>): Trade<H>[] {
		const trades = this.matcher.$match($order);
		this.orderMakes($order);
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
}
