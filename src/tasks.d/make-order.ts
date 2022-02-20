import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	LimitOrder,
	OpenOrder,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from './initialize-stages';
import Big from 'big.js';



export class MakeOrder {
	private involved: ModelLike[] = [
		this.models.progress,
		...this.controllers.makeOpenOrder.involved,
	];

	constructor(
		private context: Context,
		private models: Models,
		private controllers: Controllers,
	) { }

	public makeOrder(order: Readonly<LimitOrder>): OpenOrder {
		initializeStages(this.involved);
		const openOrder = {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: ++this.models.progress.userOrderCount,
			filled: new Big(0),
			unfilled: order.quantity,
		};
		this.models.progress.stage = true;
		return this.controllers.makeOpenOrder.makeOpenOrder(openOrder);
	}
}
