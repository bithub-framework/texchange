import {
	Length,
	HLike,
	MarketSpec,
	AccountSpec,
	Position,
} from 'secretary-like';
import { Executed } from '../../interfaces/executed';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Assets } from './assets/assets';
import { Margin, MarginStatic } from './margin';
import { Cost } from './assets/cost';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



export abstract class MarginAssets<H extends HLike<H>> implements StatefulLike<Snapshot> {
	protected Margin: MarginStatic<H>;
	protected $margin: Margin<H>;

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		protected accountSpec: AccountSpec,
		@inject(TYPES.MODELS.assets)
		protected assets: Assets<H>,
	) {
		this.Margin = new MarginStatic<H>(context.Data.H);
		this.$margin = new Margin<H>(
			context.Data.H.from(0),
			context.Data.H.from(0),
		);
	}

	public open({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		const increment = dollarVolume.div(this.accountSpec.LEVERAGE);
		this.$margin.set(
			length,
			this.$margin.get(length)
				.plus(increment)
				.round(this.marketSpec.CURRENCY_DP),
		);
		this.assets.open({ length, volume, dollarVolume })
	}

	public close({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		if (volume.eq(this.assets.getPosition().get(length))) {
			this.$margin.set(length, this.context.Data.H.from(0));
		}
		const decrement = this.$margin.get(length)
			.times(volume)
			.div(this.assets.getPosition().get(length));
		this.$margin.set(
			length,
			this.$margin.get(length)
				.minus(decrement)
				.round(this.marketSpec.CURRENCY_DP),
		);
		this.assets.close({ length, volume, dollarVolume });
	}

	public abstract getFinalMargin(): H;

	public abstract settle(
		length: Length,
		settlementPrice: H,
	): void;

	public abstract assertEnoughBalance(): void;

	public capture(): Snapshot {
		return {
			assets: this.assets.capture(),
			margin: this.Margin.capture(this.$margin),
		};
	}

	public restore(snapshot: Snapshot): void {
		this.assets.restore(snapshot.assets);
		this.$margin = this.Margin.restore(snapshot.margin);
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

export interface Snapshot {
	assets: Assets.Snapshot;
	margin: Margin.Snapshot;
}
