import { MarginAssets } from './margin-assets';
import {
	HLike,
	Length,
} from 'secretary-like';
import { Context } from '../../context';
import { Assets } from './assets';
import { MarketSpec } from 'secretary-like';
import { AccountSpec } from 'secretary-like';
import assert = require('assert');

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



export class DefaultMarginAssets<H extends HLike<H>> extends MarginAssets<H> {
	public constructor(
		@inject(TYPES.context)
		context: Context<H>,
		@inject(TYPES.marketSpec)
		marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		accountSpec: AccountSpec,
		@inject(TYPES.assets)
		assets: Assets<H>,
		@inject(TYPES.MODELS.initialBalance)
		balance: H,
	) {
		super(
			context,
			marketSpec,
			accountSpec,
			assets,
			balance,
		);
	}

	public settle(
		length: Length,
		settlementPrice: H,
	): void {
		const profit = this.assets.settle(
			length,
			settlementPrice,
		);
		this.$accumulation[length] = this.$accumulation[length]
			.plus(profit);
	}

	// public settle(
	// 	length: Length,
	// 	settlementPrice: H,
	// ): void {
	// 	const dollarVolume = this.marketSpec.dollarVolume(
	// 		settlementPrice, this.assets.getPosition()[length],
	// 	).round(this.marketSpec.CURRENCY_DP);
	// 	const executed: Executed<H> = {
	// 		length,
	// 		volume: this.assets.getPosition()[length],
	// 		dollarVolume,
	// 	};
	// 	this.close(executed);
	// 	this.open(executed);
	// }

	// 默认无锁仓优惠
	public getFinalMargin(): H {
		return this.$accumulation[Length.LONG]
			.plus(this.$accumulation[Length.SHORT]);
	}

	public assertEnoughBalance(): void {
		assert(this.$accumulation[Length.LONG].gte(0));
		assert(this.$accumulation[Length.SHORT].gte(0));
	}
}
