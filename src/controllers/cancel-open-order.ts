import { Context } from '../context/context';
import { Models } from '../models/models';
import {
	OpenOrder,
} from '../interfaces';
import { ModelLike } from '../models/model';


type Involved = Pick<Models, 'makers'>;

export class CancelOpenOrder {
	public involved: ModelLike[] = [
		this.models.makers,
	];

	constructor(
		private context: Context,
		private models: Involved,
	) { }

	public cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder {
		const { makers } = this.models;

		let filled = makers.get(order.id)?.filled;
		if (typeof filled === 'undefined')
			filled = order.quantity;
		else
			makers.tryRemoveOrder(order.id)!;
		makers.stage = true;

		return {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: order.id,
			filled,
			unfilled: order.quantity.minus(filled),
		};
	}
}
