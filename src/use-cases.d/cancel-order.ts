import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
import { ContextLike } from 'secretary-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseCancelOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.vmctx)
		private vmctx: ContextLike<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
	) { }

	public cancelOrder(order: OpenOrder<H>): OpenOrder<H> {
		let filled: H;
		try {
			filled = this.makers.getOrder(order.id).filled;
			this.makers.forcedlyRemoveOrder(order.id);
		} catch (err) {
			filled = order.quantity;
		}

		return this.vmctx.DataTypes.openOrderFactory.create({
			...order,
			filled,
			unfilled: order.quantity.minus(filled),
		});
	}
}
