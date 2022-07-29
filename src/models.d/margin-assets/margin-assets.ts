import {
	Length,
	HLike,
	MarketSpecLike,
	AccountSpecLike,
	Position,
} from 'secretary-like';
import { Executed } from '../../data-types/executed';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Assets } from './assets/assets';
import { Margin, MarginFactory } from './margin';
import { Cost } from './assets/cost';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



export abstract class MarginAssets<H extends HLike<H>> implements StatefulLike<MarginAssets.Snapshot> {
	protected marginFactory: MarginFactory<H>;
	protected $margin: Margin<H>;

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpecLike<H>,
		@inject(TYPES.accountSpec)
		protected accountSpec: AccountSpecLike,
		@inject(TYPES.MODELS.assets)
		protected assets: Assets<H>,
	) {
		this.marginFactory = new MarginFactory<H>(context.dataTypes.hFactory);
		this.$margin = {
			[Length.LONG]: context.dataTypes.hFactory.from(0),
			[Length.SHORT]: context.dataTypes.hFactory.from(0),
		};
	}

	public open({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		const increment = dollarVolume
			.div(this.accountSpec.LEVERAGE, this.marketSpec.CURRENCY_DP);
		this.$margin[length] = this.$margin[length]
			.plus(increment);
		this.assets.open({ length, volume, dollarVolume })
	}

	public close({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		if (volume.eq(this.assets.getPosition()[length])) {
			this.$margin[length] = this.context.dataTypes.hFactory.from(0);
		}
		const decrement = this.$margin[length]
			.times(volume)
			.div(this.assets.getPosition()[length], this.marketSpec.CURRENCY_DP);
		this.$margin[length] = this.$margin[length]
			.minus(decrement);
		this.assets.close({ length, volume, dollarVolume });
	}

	public abstract getFinalMargin(): H;

	public abstract settle(
		length: Length,
		settlementPrice: H,
	): void;

	public abstract assertEnoughBalance(): void;

	public capture(): MarginAssets.Snapshot {
		return {
			assets: this.assets.capture(),
			margin: this.marginFactory.capture(this.$margin),
		};
	}

	public restore(snapshot: MarginAssets.Snapshot): void {
		this.assets.restore(snapshot.assets);
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
		assets: Assets.Snapshot;
		margin: Margin.Snapshot;
	}
}
