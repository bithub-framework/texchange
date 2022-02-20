import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	Amendment,
	OpenOrder,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';



type OwnInvolved = Pick<Models, never>;

export class AmendOrder {
	private involved: ModelLike[] = [
		...this.controllers.makeOpenOrder.involved,
		...this.controllers.cancelOpenOrder.involved,
	];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private controllers: Controllers,
	) { }

	public amendOrder(amendment: Readonly<Amendment>): OpenOrder {
		initializeStages(this.involved);
		const oldOrder = this.controllers.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: OpenOrder = {
			price: amendment.newPrice,
			filled: oldOrder.filled,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
			id: amendment.id,
			side: amendment.side,
			length: amendment.length,
			operation: amendment.operation,
		};
		this.controllers.validateOrder.validateOrder(newOrder);
		return this.controllers.makeOpenOrder.makeOpenOrder(newOrder);
	}
}
