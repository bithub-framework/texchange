import { EventEmitter } from 'events';
import {
	Events,
	Side, Length, Operation,
	Closable,
} from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { ModelLike } from '../models/model';
import { max } from '../big-math';
import assert = require('assert');



export namespace AccountView {
	export type Involved = Pick<Models, 'assets' | 'makers' | 'margin'>;
}
import Involved = AccountView.Involved;

export class AccountView {
	// TODO 看看编译后是什么
	public involved: ModelLike[] = [
		this.models.assets,
		this.models.makers,
		this.models.margin,
	];

	constructor(
		protected context: Context,
		protected models: Involved,
	) { }


	public getAvailable(): Big {
		assert(this.models.assets.stage === this.models.margin.stage);
		assert(this.models.assets.stage === this.models.makers.stage);
		return this.models.assets.balance
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.CURRENCY_DP);
	}

	public getClosable(): Closable {
		const { assets, makers } = this.models;
		return {
			[Length.LONG]: assets.position[Length.LONG]
				.minus(makers.totalFrozen.position[Length.LONG]),
			[Length.SHORT]: assets.position[Length.SHORT]
				.minus(makers.totalFrozen.position[Length.SHORT]),
		};
	}

	protected finalMargin(): Big {
		// 默认无锁仓优惠
		// 默认非实时结算
		return this.models.margin[Length.LONG]
			.plus(this.models.margin[Length.SHORT]);
	}

	protected finalFrozenBalance(): Big {
		// 默认单向持仓模式
		const { position } = this.models.assets;
		const { totalFrozen, totalUnfilledQuantity } = this.models.makers;
		const final: { [length: number]: Big; } = {};
		for (const length of [Length.LONG, Length.SHORT]) {
			const side: Side = length * Operation.OPEN;
			const afterDeduction = max(
				totalUnfilledQuantity[side].minus(position[-length]),
				new Big(0),
			);
			final[length] = totalFrozen.balance[length]
				.times(afterDeduction)
				.div(totalUnfilledQuantity[side]);
		}
		return final[Length.LONG].plus(final[Length.SHORT]);
	}
}

export interface Instant extends EventEmitter {
	on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
