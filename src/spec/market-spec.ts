import {
	MarketSpecLike,
	HLike,
} from 'secretary-like';
import assert = require('assert');
import { VirtualMachineContextLike } from '../vmctx';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export abstract class MarketSpec<H extends HLike<H>> implements MarketSpecLike<H> {
	public abstract PRICE_SCALE: number;
	public abstract QUANTITY_SCALE: number;
	public abstract CURRENCY_SCALE: number;
	public TICK_SIZE: H;
	public abstract MARKET_NAME: string;

	public constructor(
		@inject(TYPES.vmctx)
		context: VirtualMachineContextLike<H>,
	) {
		this.TICK_SIZE = context.DataTypes.hFactory.from('.01');
	}

	protected abstract unroundedQuantity(price: H, dollarVolume: H): H;

	public quantity(price: H, dollarVolume: H): H {
		assert(price.neq(0));
		return this.unroundedQuantity(price, dollarVolume)
			.round(this.QUANTITY_SCALE);
	}

	protected abstract unroundedDollarVolume(price: H, quantity: H): H;

	public dollarVolume(price: H, quantity: H): H {
		return this.unroundedDollarVolume(price, quantity)
			.round(this.CURRENCY_SCALE);
	}
}
