import {
	Length,
	HLike,
	MarketSpec,
	AccountSpec,
	Position,
} from 'secretary-like';
import { Executed } from '../../data-types/executed';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
import { CreditAssets } from './credit-assets/credit-assets';
import { Margin, MarginFactory } from './margin';
import { Cost } from './credit-assets/cost';
import { CreditAssetsLike } from './credit-assets/credit-assets-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



export abstract class MarginAssets<H extends HLike<H>>
	implements CreditAssetsLike<H>, StatefulLike<MarginAssets.Snapshot> {
	protected marginFactory: MarginFactory<H>;
	protected $margin: Margin<H>;

	public constructor(
		@inject(TYPES.vmctx)
		protected vmctx: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		protected accountSpec: AccountSpec,
		@inject(TYPES.MODELS.creditAssets)
		protected assets: CreditAssets<H>,
	) {
		this.marginFactory = new MarginFactory<H>(vmctx.DataTypes.hFactory);
		this.$margin = {
			[Length.LONG]: vmctx.DataTypes.hFactory.from(0),
			[Length.SHORT]: vmctx.DataTypes.hFactory.from(0),
		};
	}

	public open({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		const increment = dollarVolume
			.div(this.accountSpec.LEVERAGE, this.marketSpec.CURRENCY_SCALE);
		this.$margin[length] = this.$margin[length]
			.plus(increment);
		this.assets.open({ length, volume, dollarVolume })
	}

	public close({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): H {
		if (volume.eq(this.assets.getPosition()[length])) {
			this.$margin[length] = this.vmctx.DataTypes.hFactory.from(0);
		}
		const decrement = volume.eq(0)
			? this.vmctx.DataTypes.hFactory.from(0)
			: this.$margin[length]
				.times(volume)
				.div(this.assets.getPosition()[length], this.marketSpec.CURRENCY_SCALE);
		this.$margin[length] = this.$margin[length]
			.minus(decrement);
		return this.assets.close({ length, volume, dollarVolume });
	}

	public abstract getFinalMargin(): H;

	public abstract settle(
		length: Length,
		settlementPrice: H,
	): H;

	public abstract assertEnoughBalance(): void;

	public capture(): MarginAssets.Snapshot {
		return {
			creditAssets: this.assets.capture(),
			margin: this.marginFactory.capture(this.$margin),
		};
	}

	public restore(snapshot: MarginAssets.Snapshot): void {
		this.assets.restore(snapshot.creditAssets);
		this.$margin = this.marginFactory.restore(snapshot.margin);
	}

	public getPosition(): Position<H> {
		return this.assets.getPosition();
	}

	public getBalance(): H {
		return this.assets.getBalance();
	}

	public getCost(): Cost<H> {
		return this.assets.getCost();
	}

	public pay(fee: H): void {
		this.assets.pay(fee);
	}
}

export namespace MarginAssets {
	export interface Snapshot {
		creditAssets: CreditAssets.Snapshot;
		margin: Margin.Snapshot;
	}
}
