import {
	HLike,
	Amendment,
	OpenOrder,
} from 'secretary-like';
import { UserOrderHandler } from '../middlewares/user-order-handler';


import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseAmendOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MIDDLEWARES.userOrderHandler)
		private userOrderHandler: UserOrderHandler<H>,
	) { }

	public amendOrder(amendment: Amendment<H>): OpenOrder<H> {
		const oldOrder = this.userOrderHandler.cancelOpenOrder(amendment);
		const newOrder: OpenOrder<H> = {
			...oldOrder,
			price: amendment.newPrice,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
		};
		return this.userOrderHandler.makeOpenOrder(newOrder);
	}
}
