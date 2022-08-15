import {
	Action, Length, Side,
	HLike,
	OpenOrder,
	MarketSpec,
	AccountSpec,
} from 'secretary-like';
import assert = require('assert');
import { VirtualMachineContextLike } from '../vmctx';
import { Makers } from '../models.d/makers/makers';
import { AvailableAssetsCalculator } from './available-assets-calculator/available-assets-calculator';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class OrderValidator<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.vmctx)
		private vmctx: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
	) { }

	public validateOrder(order: OpenOrder<H>): void {
		this.validateFormat(order);
		this.validateQuantity(order);
	}

	private validateQuantity(order: OpenOrder<H>): void {
		this.makers.appendOrder(
			order,
			this.vmctx.DataTypes.hFactory.from(0),
		);
		try {
			const closable = this.calculator.getClosable();
			const enoughPosition =
				closable[Length.LONG].gte(0) &&
				closable[Length.SHORT].gte(0);
			assert(enoughPosition);

			const enoughBalance = this.calculator.getAvailable()
				.gte(
					this.marketSpec.dollarVolume(
						order.price, order.unfilled,
					).times(
						Math.max(this.accountSpec.TAKER_FEE_RATE, 0)
					).round(this.marketSpec.CURRENCY_SCALE)
				);
			assert(enoughBalance);
		} finally {
			this.makers.removeOrder(order.id);
		}
	}

	private validateFormat(order: OpenOrder<H>) {
		assert(order.price.eq(order.price.round(this.marketSpec.PRICE_SCALE)));
		assert(order.price.mod(this.marketSpec.TICK_SIZE).eq(0));
		assert(order.unfilled.gt(0));
		assert(order.unfilled.eq(order.unfilled.round(this.marketSpec.QUANTITY_SCALE)));
		assert(order.length === Length.LONG || order.length === Length.SHORT);
		assert(order.action === Action.OPEN || order.action === Action.CLOSE);
		assert(Side.from(order.length, order.action) === order.side);
	}
}
