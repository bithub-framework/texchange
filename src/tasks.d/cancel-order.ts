import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	OpenOrder,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from './initialize-stages';



export class CancelOrder {
	private involved: ModelLike[] = [
		...this.controllers.cancelOpenOrder.involved,
	];

	constructor(
		private context: Context,
		private models: Models,
		private controllers: Controllers,
	) { }

	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
		initializeStages(this.involved);
		return this.controllers.cancelOpenOrder.cancelOpenOrder(order);
	}
}
