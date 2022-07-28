import {
	HLike,
	Length,
	Balances,
	Positions,
	Position,
} from 'secretary-like';
import { Context } from '../../context';
import { MarginAssets } from '../../models.d/margin-assets';
import { Makers } from '../../models.d/makers/makers';
import { MarketSpec } from 'secretary-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export abstract class AvailableAssetsCalculator<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpec<H>,
		@inject(TYPES.MODELS.marginAssets)
		protected marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.makers)
		protected makers: Makers<H>,
	) { }

	public getAvailable(): H {
		return this.marginAssets.getBalance()
			.minus(this.marginAssets.getFinalMargin())
			.minus(this.getFinalFrozenBalance());
	}

	protected abstract getFinalFrozenBalance(): H;

	public getClosable(): Position<H> {
		const totalFrozen = this.makers.getTotalFrozen();
		const position = this.marginAssets.getPosition();
		return {
			[Length.LONG]: position[Length.LONG]
				.minus(totalFrozen.position[Length.LONG]),
			[Length.SHORT]: position[Length.SHORT]
				.minus(totalFrozen.position[Length.SHORT]),
		};
	}

	public getBalances(): Balances<H> {
		return {
			balance: this.marginAssets.getBalance(),
			available: this.getAvailable(),
			time: this.context.timeline.now(),
		};
	}

	public getPositions(): Positions<H> {
		return {
			position: this.marginAssets.getPosition(),
			closable: this.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}
