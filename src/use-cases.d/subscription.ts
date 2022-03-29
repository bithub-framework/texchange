import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	TexchangeTradeId,
	Trade,
	Orderbook,
	Positions,
	Balances,
} from 'interfaces';
import { EventEmitter } from 'events';

export class Subscription<H extends HLike<H>>
	extends EventEmitter {

	public constructor(
		protected context: Context<H>,
		protected models: Subscription.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: Subscription.TaskDeps<H>,
	) {
		super();

		this.broadcast.on('balances', balances => this.emit('balances', balances));
		this.broadcast.on('positions', positions => this.emit('positions', positions));
		this.broadcast.on('trades', trades => this.emit('trades', trades));
		this.broadcast.on('orderbook', orderbook => this.emit('orderbook', orderbook));
	}

}

export namespace Subscription {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> { }

	export interface Events<H extends HLike<H>> {
		trades: [readonly Trade<H, TexchangeTradeId>[]];
		orderbook: [Orderbook<H>];
		positions: [Positions<H>];
		balances: [Balances<H>];
	}
}

export namespace Subscription {
	export interface Events<H extends HLike<H>> {
		trades: [readonly Trade<H, TexchangeTradeId>[]];
		orderbook: [Orderbook<H>];
		positions: [Positions<H>];
		balances: [Balances<H>];
	}
}
import Events = Subscription.Events;

export interface Subscription<H extends HLike<H>> extends EventEmitter {
	on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
