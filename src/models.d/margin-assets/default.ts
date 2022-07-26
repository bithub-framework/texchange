import { MarginAssets } from './margin-assets';
import {
	HLike,
	Length,
} from 'secretary-like';
import assert = require('assert');

import { injextends } from '@zimtsui/injektor';


@injextends()
export class DefaultMarginAssets<H extends HLike<H>> extends MarginAssets<H> {
	// 默认逐仓
	public settle(
		length: Length,
		settlementPrice: H,
	): void {
		const profit = this.assets.settle(
			length,
			settlementPrice,
		);
		this.$margin.set(length,
			this.$margin.get(length).plus(profit),
		);
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
		return this.$margin.get(Length.LONG)
			.plus(this.$margin.get(Length.SHORT));
	}

	public assertEnoughBalance(): void {
		assert(this.$margin.get(Length.LONG).gte(0));
		assert(this.$margin.get(Length.SHORT).gte(0));
	}
}
