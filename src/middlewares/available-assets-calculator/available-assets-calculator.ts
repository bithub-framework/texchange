import {
	HLike,
	Length,
	Balances,
	Positions,
	Position,
	MarketSpec,
} from 'secretary-like';
import { VirtualMachineContextLike } from '../../vmctx';
import { MarginAssets } from '../../models.d/margin-assets';
import { Makers } from '../../models.d/makers/makers';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export abstract class AvailableAssetsCalculator<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.vMCTX)
		protected vMCTX: VirtualMachineContextLike<H>,
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
		return this.vMCTX.DataTypes.positionFactory.new({
			[Length.LONG]: position[Length.LONG]
				.minus(totalFrozen.position[Length.LONG]),
			[Length.SHORT]: position[Length.SHORT]
				.minus(totalFrozen.position[Length.SHORT]),
		});
	}

	public getBalances(): Balances<H> {
		return this.vMCTX.DataTypes.balancesFactory.new({
			balance: this.marginAssets.getBalance(),
			available: this.getAvailable(),
			time: this.vMCTX.timeline.now(),
		});
	}

	public getPositions(): Positions<H> {
		return this.vMCTX.DataTypes.positionsFactory.new({
			position: this.marginAssets.getPosition(),
			closable: this.getClosable(),
			time: this.vMCTX.timeline.now(),
		});
	}
}
