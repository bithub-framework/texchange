import {
	Side,
	Action,
	HLike, H,
	OpenOrderLike,
	TradeLike,
	MarketSpecLike,
	AccountSpecLike,
} from 'secretary-like';
import { OpenMakerLike } from '../data-types/open-maker';
import { VirtualMachineContextLike } from '../vmctx';
import { Makers } from '../models.d/makers/makers';
import { MarginAssets } from '../models.d/margin-assets';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class DatabaseTradeHandler<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.vmctx)
		private context: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpecLike<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpecLike,
		@inject(TYPES.MODELS.marginAssets)
		private marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
	) { }

	public tradeTakesOpenMakers(trade: TradeLike<H>): void {
		const $trade = this.context.DataTypes.tradeFactory.new(trade);
		for (const order of [...this.makers])
			if (this.$tradeShouldTakeOpenOrder($trade, order)) {
				this.$tradeTakesOrderQueue($trade, order);
				this.$tradeTakesOpenMaker($trade, order);
			}
	}

	private $tradeShouldTakeOpenOrder(
		$trade: TradeLike<H>, maker: OpenOrderLike<H>,
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
		$trade: TradeLike<H>,
		maker: OpenMakerLike<H>,
	): void {
		if ($trade.price.eq(maker.price)) {
			const volume = this.context.DataTypes.H.min($trade.quantity, maker.behind);
			$trade.quantity = $trade.quantity.minus(volume);
			this.makers.takeOrderQueue(maker.id, volume);
		} else this.makers.takeOrderQueue(maker.id);
	}

	private $tradeTakesOpenMaker(
		$trade: TradeLike<H>,
		maker: OpenMakerLike<H>,
	): void {
		const volume = this.context.DataTypes.H.min($trade.quantity, maker.unfilled);
		const dollarVolume = this.marketSpec
			.dollarVolume(maker.price, volume);
		$trade.quantity = $trade.quantity.minus(volume);
		this.makers.takeOrder(maker.id, volume);

		this.marginAssets.pay(
			dollarVolume
				.times(this.accountSpec.MAKER_FEE_RATE)
				.round(this.marketSpec.CURRENCY_SCALE, H.RoundingMode.HALF_AWAY_FROM_ZERO)
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
