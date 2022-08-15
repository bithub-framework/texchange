import { EventEmitter } from 'events';
import {
	Orderbook,
	Positions,
	Balances,
	Trade,
	HLike,
} from 'secretary-like';


export class Broadcast<H extends HLike<H>> extends EventEmitter {
	public constructor() {
		super();
		this.on('error', () => { });
	}
}

export interface Events<H extends HLike<H>> {
	trades: [Trade<H>[]];
	orderbook: [Orderbook<H>];
	positions: [Positions<H>];
	balances: [Balances<H>];
	error: [Error];
}

export interface Broadcast<H extends HLike<H>> extends EventEmitter {
	on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
	emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
