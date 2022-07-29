import {
	Side,
	Action,
	HLike, H,
	OpenOrder,
	Trade,
	MarketSpecLike,
	AccountSpecLike,
} from 'secretary-like';
import { OpenMaker } from '../data-types/open-maker';
import { Context } from '../context';
import { Makers } from '../models.d/makers/makers';
import { MarginAssets } from '../models.d/margin-assets';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class DatabaseTradeHandler<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpecLike<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpecLike,
		@inject(TYPES.MODELS.marginAssets)
		private marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
	) { }

	public tradeTakesOpenMakers(trade: Trade<H>): void {
		const $trade = this.context.dataTypes.tradeFactory.copy(trade);
		for (const order of [...this.makers])
			if (this.$tradeShouldTakeOpenOrder($trade, order)) {
				this.$tradeTakesOrderQueue($trade, order);
				this.$tradeTakesOpenMaker($trade, order);
			}
	}

	private $tradeShouldTakeOpenOrder(
		$trade: Trade<H>, maker: OpenOrder<H>,
	): boolean {
		return (
			maker.side === Side.BID &&
			$trade.side === Side.ASK &&
			$trade.price.lte(maker.price)
			||
			maker.side === Side.ASK &&
			$trade.side === Side.BID &&
			$trade.price.gte(maker.price)
		);
	}

	private $tradeTakesOrderQueue(
		$trade: Trade<H>,
		maker: OpenMaker<H>,
	): void {
		if ($trade.price.eq(maker.price)) {
			const volume = this.context.dataTypes.H.min($trade.quantity, maker.behind);
			$trade.quantity = $trade.quantity.minus(volume);
			this.makers.takeOrderQueue(maker.id, volume);
		} else this.makers.takeOrderQueue(maker.id);
	}

	private $tradeTakesOpenMaker(
		$trade: Trade<H>,
		maker: OpenMaker<H>,
	): void {
		const volume = this.context.dataTypes.H.min($trade.quantity, maker.unfilled);
		const dollarVolume = this.marketSpec
			.dollarVolume(maker.price, volume);
		$trade.quantity = $trade.quantity.minus(volume);
		this.makers.takeOrder(maker.id, volume);

		this.marginAssets.pay(
			dollarVolume
				.times(this.accountSpec.MAKER_FEE_RATE)
				.round(this.marketSpec.CURRENCY_DP, H.RoundingMode.HALF_AWAY_FROM_ZERO)
		);
		if (maker.action === Action.OPEN)
			this.marginAssets.open({
				length: maker.length,
				volume,
				dollarVolume,
			});
		else
			this.marginAssets.close({
				length: maker.length,
				volume,
				dollarVolume,
			});
	}
}
