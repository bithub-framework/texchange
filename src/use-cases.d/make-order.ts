import { Context } from '../context';
import {
	LimitOrder,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Progress } from '../models.d/progress';
import { UserOrderHandler } from '../middlewares/user-order-handler';


export class UseCaseMakeOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.MIDDLEWARES.userOrderHandler)
		private userOrderhandler: UserOrderHandler<H>,
	) { }

	public makeOrder(order: LimitOrder<H>): OpenOrder<H> {
		return this.userOrderhandler.makeOpenOrder({
			...order,
			id: ++this.progress.userOrderCount,
			filled: new this.context.Data.H(0),
			unfilled: order.quantity,
		});
	}
}
