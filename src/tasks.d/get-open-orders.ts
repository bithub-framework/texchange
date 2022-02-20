import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	OpenOrder,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';


type OwnInvolved = Pick<Models, 'makers'>;

export class GetOpenOrders {
	private involved: ModelLike[] = [];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private controllers: Controllers,
	) { }

	public getOpenOrders(): OpenOrder[] {
		initializeStages(this.involved);

		const openOrders = [...this.models.makers.values()];
		return openOrders.map(order => ({
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: order.id,
			filled: order.filled,
			unfilled: order.unfilled,
		}));
	}
}
