import { EventEmitter } from 'events';
import {
	Events,
	Trade,
	OpenOrder,
	LimitOrder,
	Amendment,
	Positions,
	Balances,
	Side, Length,
	Closable,
} from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';


interface Deps extends Pick<Hub, 'context' | 'models'> { }


export class AccountView {
	constructor(private hub: Deps) { }

	public getAvailable(): Big {
		return this.hub.models.assets.balance
			.minus(this.hub.context.calculation.finalMargin())
			.minus(this.hub.context.calculation.finalFrozenBalance())
			.round(this.hub.context.config.CURRENCY_DP);
	}

	public getClosable(): Closable {
		const { assets, makers } = this.hub.models;
		return {
			[Length.LONG]: assets.position[Length.LONG]
				.minus(makers.totalFrozen.position[Length.LONG]),
			[Length.SHORT]: assets.position[Length.SHORT]
				.minus(makers.totalFrozen.position[Length.SHORT]),
		};
	}
}

export interface Instant extends EventEmitter {
	on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
