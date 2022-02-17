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
	Orderbook,
} from '../interfaces';
import Big from 'big.js';
import { type Stages } from '../scheduler';


export type Involved = keyof Pick<Models, 'progress' | 'makers' | 'book'>
	| Taking.Involved
	| Making.Involved
	| Validation.Involved;

export class Ordering extends EventEmitter {
	public static involved: Involved[] = [
		'progress', 'makers', 'book',
		...Taking.involved,
		...Making.involved,
		...Validation.involved,
	];

	constructor(
		private context: Context,
		private models: Pick<Models, Involved>,
		private stages: Pick<Stages, Involved>,
		private validation: Validation,
		private taking: Taking,
		private making: Making,
	) { super(); }

	public makeOrder(order: Readonly<LimitOrder>): OpenOrder {
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
		this.stages.progress = true;
		return this.makeOpenOrder(openOrder);
	}

	private makeOpenOrder(order: OpenOrder): OpenOrder {
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

	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
		return this.cancelOpenOrder(order);
	}

	private cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder {
		const { makers } = this.models;
		let filled = makers.get(order.id)?.filled;
		if (typeof filled === 'undefined')
			filled = order.quantity;
		else
			makers.tryRemoveOrder(order.id)!;
		this.stages.makers = true;
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

	public amendOrder(amendment: Readonly<Amendment>): OpenOrder {
		const oldOrder = this.cancelOpenOrder(amendment);
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
		this.validation.validateOrder(newOrder);
		return this.makeOpenOrder(newOrder);
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
