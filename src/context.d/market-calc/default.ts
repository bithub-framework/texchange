import { HLike, MarketCalc } from 'interfaces';
import assert = require('assert');


/**
 * 默认正向合约
 */
export class DefaultMarketCalc<H extends HLike<H>>
	implements MarketCalc<H> {

	public quantity(price: H, dollarVolume: H): H {
		assert(price.gt(0));
		return dollarVolume.div(price);
	}

	public dollarVolume(price: H, quantity: H): H {
		return price.times(quantity);
	}
}
