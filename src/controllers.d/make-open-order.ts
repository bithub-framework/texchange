import { EventEmitter } from 'events';
import { Context } from '../context';
import { Broadcast } from '../context.d/broadcast';
import { ValidateOrder } from './validate-order';
import { OrderTakes } from './order-takes';
import { OrderMakes } from './order-makes';
import { GetBalances } from './get-balances';
import { GetPositions } from './get-positions';
import {
	OpenOrder,
	Trade,
} from '../interfaces';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';



type OwnInvolved = Pick<Models, 'book'>;
export namespace MakeOpenOrder {
	export type Involved = OwnInvolved
		& OrderTakes.Involved
		& OrderMakes.Involved
		& ValidateOrder.Involved
		& GetBalances.Involved
		& GetPositions.Involved;
}


export class MakeOpenOrder extends EventEmitter implements ControllerLike {
	public involved: ModelLike[] = [
		...this.validateOrder.involved,
		...this.orderTakes.involved,
		...this.orderMakes.involved,
		...this.getBalances.involved,
		...this.getPositions.involved,
	];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private validateOrder: ValidateOrder,
		private orderTakes: OrderTakes,
		private orderMakes: OrderMakes,
		private getBalances: GetBalances,
		private getPositions: GetPositions,
	) { super(); }

	public makeOpenOrder(order: OpenOrder): OpenOrder {
		const trades = this.orderTakes.orderTakes(order);
		this.validateOrder.validateOrder(order);
		this.orderMakes.orderMakes(order);
		if (trades.length) {
			this.context.broadcast.emit('trades', trades);
			this.context.broadcast.emit('orderbook', this.models.book.getBook());
			this.context.broadcast.emit('balances', this.getBalances.getBalances());
			this.context.broadcast.emit('positions', this.getPositions.getPositions());
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
