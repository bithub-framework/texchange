import {
	HLike, H,
	OpenOrder,
	Trade,
	Side, Action,
	MarketSpec,
	AccountSpec,
} from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';

import { TYPES } from '../injection/types';
import { inject } from '@zimtsui/injektor';


export class Matcher<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.vMCTX)
		private vMCTX: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.MODELS.book)
		private book: Book<H>,
		@inject(TYPES.MODELS.marginAssets)
		private marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
	) { }

	public $match($taker: OpenOrder<H>): Trade<H>[] {
		const orderbook = this.book.getOrderbook();

		const trades: Trade<H>[] = [];
		let volume = this.vMCTX.DataTypes.hFactory.from(0);
		let dollarVolume = this.vMCTX.DataTypes.hFactory.from(0);
		for (const maker of orderbook[Side.invert($taker.side)])
			if (
				(
					$taker.side === Side.BID && $taker.price.gte(maker.price) ||
					$taker.side === Side.ASK && $taker.price.lte(maker.price)
				) && $taker.unfilled.gt(0)
			) {
				const quantity = this.vMCTX.DataTypes.H.min($taker.unfilled, maker.quantity);
				this.book.decQuantity(maker.side, maker.price, quantity);
				$taker.filled = $taker.filled.plus(quantity);
				$taker.unfilled = $taker.unfilled.minus(quantity);
				volume = volume.plus(quantity);
				dollarVolume = dollarVolume
					.plus(this.marketSpec.dollarVolume(maker.price, quantity));
				trades.push(this.vMCTX.DataTypes.tradeFactory.new({
					side: $taker.side,
					price: maker.price,
					quantity,
					time: this.vMCTX.timeline.now(),
					id: ++this.progress.userTradeCount,
				}));
			}

		this.marginAssets.pay(
			dollarVolume
				.times(this.accountSpec.TAKER_FEE_RATE)
				.round(
					this.marketSpec.CURRENCY_SCALE,
					H.RoundingMode.HALF_AWAY_FROM_ZERO,
				),
		);
		if ($taker.action === Action.OPEN)
			this.marginAssets.open({
				length: $taker.length,
				volume,
				dollarVolume,
			});
		else
			this.marginAssets.close({
				length: $taker.length,
				volume,
				dollarVolume,
			});

		return trades;
	}
}
