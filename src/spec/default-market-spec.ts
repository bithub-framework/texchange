import { HLike } from 'secretary-like';
import { injextends } from '@zimtsui/injektor';
import assert = require('assert');
import { MarketSpec } from './market-spec';


/**
 * 默认正向合约
 */
@injextends()
export class DefaultMarketSpec<H extends HLike<H>> extends MarketSpec<H> {
	public PRICE_DP = 2;
	public QUANTITY_DP = 3;
	public CURRENCY_DP = 2;
	public MARKET_NAME = 'test';

	protected unroundedQuantity(price: H, dollarVolume: H): H {
		assert(price.neq(0));
		return dollarVolume.div(price, this.QUANTITY_DP);
	}

	protected unroundedDollarVolume(price: H, quantity: H): H {
		return price.times(quantity)
			.round(this.CURRENCY_DP);
	}
}
