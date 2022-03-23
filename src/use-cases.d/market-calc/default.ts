import { HLike } from 'interfaces';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { MarketCalc } from './market-calc';
import assert = require('assert');


/**
 * 默认正向合约
 */
export class DefaultMarketCalc<H extends HLike<H>>
	extends MarketCalc<H> {

	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: DefaultMarketCalc.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: DefaultMarketCalc.TaskDeps<H>,
	) { super(); }

	public quantity(price: H, dollarVolume: H): H {
		assert(price.gt(0));
		return dollarVolume.div(price);
	}

	public dollarVolume(price: H, quantity: H): H {
		return price.times(quantity);
	}
}

export namespace DefaultMarketCalc {
	export interface ModelDeps<H extends HLike<H>>
		extends MarketCalc.ModelDeps<H> { }

	export interface TaskDeps<H extends HLike<H>>
		extends MarketCalc.TaskDeps<H> { }
}
