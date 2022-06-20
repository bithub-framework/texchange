import { MarketSpec, HLike } from 'secretary-like';
import { Context } from '../context';
import assert = require('assert');


/**
 * 默认正向合约
 */
export class DefaultMarketSpec<H extends HLike<H>> implements MarketSpec<H> {
	public PRICE_DP = 2;
	public QUANTITY_DP = 3;
	public CURRENCY_DP = 2;
	public TICK_SIZE: H;
	public MARKET_NAME = 'test';

	public constructor(
		context: Context<H>,
	) {
		this.TICK_SIZE = new context.Data.H('.5');
	}

	public quantity(price: H, dollarVolume: H): H {
		assert(price.neq(0));
		return dollarVolume.div(price);
	}

	public dollarVolume(price: H, quantity: H): H {
		return price.times(quantity);
	}
}