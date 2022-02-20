import { EventEmitter } from 'events';
import { Context } from '../context';
import { ValidateOrder } from './validate-order';
import { OrderTakes } from './order-takes';
import { OrderMakes } from './order-makes';
import {
	OpenOrder,
	Trade,
} from '../interfaces';
import { ModelLike } from '../models.d/model';


type Involved =
	OrderTakes.Involved
	& OrderMakes.Involved
	& ValidateOrder.Involved;

export class MakeOpenOrder extends EventEmitter {
	public involved: ModelLike[] = [
		...this.validation.involved,
		...this.taking.involved,
		...this.making.involved,
	];

	constructor(
		private context: Context,
		private models: Involved,
		private validation: ValidateOrder,
		private taking: OrderTakes,
		private making: OrderMakes,
	) { super(); }

	public makeOpenOrder(order: OpenOrder): OpenOrder {
		const trades = this.taking.orderTakes(order);
		this.validation.validateOrder(order);
		this.making.orderMakes(order);
		if (trades.length) {
			this.emit('pushTrades', trades);
			this.emit('pushOrderbook');
			this.emit('pushBalances');
			this.emit('pushPositions');
		}
		return order;
	}
}

type Events = {
	pushTrades: [readonly Readonly<Trade>[]];
	pushOrderbook: [];
	pushPositions: [];
	pushBalances: [];
}

export interface Ordering extends EventEmitter {
	on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
