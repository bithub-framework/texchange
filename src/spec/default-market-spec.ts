import {
	HLike,
	MarketSpec,
} from 'secretary-like';
import assert = require('assert');
import { VirtualMachineContextLike } from '../vmctx';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


/**
 * 默认正向合约
 */
export class DefaultMarketSpec<H extends HLike<H>> implements MarketSpec<H> {
	public PRICE_SCALE = 2;
	public QUANTITY_SCALE = 3;
	public CURRENCY_SCALE = 2;
	public MARKET_NAME = 'test';
	public TICK_SIZE: H;

	public constructor(
		@inject(TYPES.vmctx)
		context: VirtualMachineContextLike<H>,
	) {
		this.TICK_SIZE = context.DataTypes.hFactory.from('.01');
	}

	public quantity(price: H, dollarVolume: H): H {
		assert(price.neq(0));
		return dollarVolume.div(price, this.QUANTITY_SCALE);
	}

	public dollarVolume(price: H, quantity: H): H {
		return price.times(quantity)
			.round(this.CURRENCY_SCALE);
	}
}
