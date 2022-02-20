import { Context } from '../context';
import { Models } from '../models';
import {
	OpenOrder,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';



type OwnInvolved = Pick<Models, 'makers'>;
export namespace CancelOpenOrder {
	export type Involved = OwnInvolved;
}

export class CancelOpenOrder implements ControllerLike {
	public involved: ModelLike[] = [
		this.models.makers,
	];

	constructor(
		private context: Context,
		private models: OwnInvolved,
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
