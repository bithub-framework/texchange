import {
	Trade,
	Orderbook,
	Positions,
	Balances,
	HLike,
	TexchangeTradeId,
	TexchangeTrades,
} from 'interfaces';
import { EventEmitter } from 'events';


export namespace Broadcast {
	export interface Events<H extends HLike<H>> {
		trades: [TexchangeTrades<H>];
		orderbook: [Orderbook<H>];
		positions: [Positions<H>];
		balances: [Balances<H>];
	}
}
import Events = Broadcast.Events;

export interface Broadcast<H extends HLike<H>> extends NodeJS.EventEmitter {
	on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
