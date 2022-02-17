import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Validation } from './validation';
import { Taking } from './taking';
import { Making } from './making';
import {
	LimitOrder,
	OpenOrder,
	Amendment,
	Trade,
} from '../interfaces';
import Big from 'big.js';
import { ModelLike } from '../models/model';


type Involved =
	Taking.Involved
	& Making.Involved
	& Validation.Involved;

export class MakeOpenOrder extends EventEmitter {
	public involved: ModelLike[] = [
		...this.validation.involved,
		...this.taking.involved,
		...this.making.involved,
	];

	constructor(
		private context: Context,
		private models: Involved,
		private validation: Validation,
		private taking: Taking,
		private making: Making,
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
