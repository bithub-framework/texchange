import { Broadcast } from '../middlewares/broadcast';
import {
	HLike,
	Trade,
	Orderbook,
	Positions,
	Balances,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { EventEmitter } from 'events';

export class UseCaseSubscription<H extends HLike<H>>
	extends EventEmitter {

	public constructor(
		@inject(TYPES.MIDDLEWARES.broadcast)
		private broadcast: Broadcast<H>,
	) {
		super();

		this.broadcast.on('balances', balances => this.emit('balances', balances));
		this.broadcast.on('positions', positions => this.emit('positions', positions));
		this.broadcast.on('trades', trades => this.emit('trades', trades));
		this.broadcast.on('orderbook', orderbook => this.emit('orderbook', orderbook));
		this.broadcast.on('disconnection', () => this.emit('disconnection'));
	}
}

export namespace UseCaseSubscription {
	export interface Events<H extends HLike<H>> {
		trades: [readonly Trade<H>[]];
		orderbook: [Orderbook<H>];
		positions: [Positions<H>];
		balances: [Balances<H>];
		disconnection: [];
	}
}
import Events = UseCaseSubscription.Events;

export interface UseCaseSubscription<H extends HLike<H>> extends EventEmitter {
	on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
