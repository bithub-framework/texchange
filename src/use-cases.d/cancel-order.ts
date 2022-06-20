import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { UserOrderHandler } from '../middlewares/user-order-handler';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseCancelOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MIDDLEWARES.userOrderHandler)
		private userOrderHandler: UserOrderHandler<H>,
	) { }

	public cancelOrder(order: OpenOrder<H>): OpenOrder<H> {
		return this.userOrderHandler.cancelOpenOrder(order);
	}
}
