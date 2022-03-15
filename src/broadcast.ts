import {
	Trade,
	Orderbook,
	Positions,
	Balances,
	HLike,
	TexchangeTradeId,
} from 'interfaces';
import { EventEmitter } from 'events';


export class Broadcast<H extends HLike<H>> extends EventEmitter { }

export namespace Broadcast {
	export interface Events<H extends HLike<H>> {
		trades: [readonly Trade<H, TexchangeTradeId>[]];
		orderbook: [Orderbook<H>];
		positions: [Positions<H>];
		balances: [Balances<H>];
	}
}
import Events = Broadcast.Events;

export interface Broadcast<H extends HLike<H>> extends EventEmitter {
	on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
