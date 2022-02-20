import {
	Side, Length, Operation,
} from '../interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
import { max } from '../big-math';
import assert = require('assert');



type OwnInvolved = Pick<Models, 'assets' | 'makers' | 'margin'>;
export namespace GetAvailable {
	export type Involved = OwnInvolved;
}

export class GetAvailable implements ControllerLike {
	public involved: ModelLike[] = [
		this.models.assets,
		this.models.makers,
		this.models.margin,
	];

	constructor(
		protected context: Context,
		protected models: OwnInvolved,
	) { }


	public getAvailable(): Big {
		assert(this.models.assets.stage === this.models.margin.stage);
		assert(this.models.assets.stage === this.models.makers.stage);
		return this.models.assets.balance
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.CURRENCY_DP);
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
