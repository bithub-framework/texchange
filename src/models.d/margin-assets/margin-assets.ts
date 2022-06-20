import {
	Length,
	H, HLike, HStatic,
	MarketSpec,
	AccountSpec,
	Position,
} from 'secretary-like';
import { Executed } from '../../interfaces/executed';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Assets } from './assets';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



export abstract class MarginAssets<H extends HLike<H>> implements StatefulLike<MarginAssets.Snapshot> {
	protected Margin: MarginAssets.MarginStatic<H>;
	protected $accumulation: MarginAssets.Margin<H>;

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.marketSpec)
		protected marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		protected accountSpec: AccountSpec,
		@inject(TYPES.MODELS.assets)
		protected assets: Assets<H>,
		@inject(TYPES.MODELS.initialBalance)
		balance: H,
	) {
		this.Margin = new MarginAssets.MarginStatic<H>(context.Data.H);
		this.$accumulation = {
			[Length.LONG]: new context.Data.H(0),
			[Length.SHORT]: new context.Data.H(0),
		};
	}

	public open({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		const increment = dollarVolume.div(this.accountSpec.LEVERAGE);
		this.$accumulation[length] = this.$accumulation[length]
			.plus(increment)
			.round(this.marketSpec.CURRENCY_DP);
		this.assets.open({ length, volume, dollarVolume })
	}

	public close({
		length,
		volume,
		dollarVolume,
	}: Executed<H>): void {
		if (volume.eq(this.assets.getPosition()[length])) {
			this.$accumulation[length] = new this.context.Data.H(0);
		}
		const decrement = this.$accumulation[length]
			.times(volume)
			.div(this.assets.getPosition()[length]);
		this.$accumulation[length] = this.$accumulation[length]
			.minus(decrement)
			.round(this.marketSpec.CURRENCY_DP);
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
			margin: this.Margin.capture(this.$accumulation),
		};
	}

	public restore(snapshot: MarginAssets.Snapshot): void {
		this.assets.restore(snapshot.assets);
		this.$accumulation = this.Margin.restore(snapshot.margin);
	}

	public getPosition(): Position<H> {
		return this.assets.getPosition();
	}

	public getBalance(): H {
		return this.assets.getBalance();
	}

	public getCost(): Assets.Cost<H> {
		return this.assets.getCost();
	}

	public pay(fee: H): void {
		this.assets.pay(fee);
	}
}


export namespace MarginAssets {
	export interface Margin<H extends HLike<H>> {
		[length: Length]: H;
	}

	export namespace Margin {
		export interface Snapshot {
			[length: Length]: H.Snapshot;
		}
	}

	export class MarginStatic<H extends HLike<H>>{
		public constructor(
			private H: HStatic<H>,
		) { }

		public capture(margin: Margin<H>): Margin.Snapshot {
			return {
				[Length.LONG]: this.H.capture(margin[Length.LONG]),
				[Length.SHORT]: this.H.capture(margin[Length.SHORT]),
			};
		}

		public restore(snapshot: Margin.Snapshot): Margin<H> {
			return {
				[Length.LONG]: this.H.restore(snapshot[Length.LONG]),
				[Length.SHORT]: this.H.restore(snapshot[Length.SHORT]),
			};
		}

		public copy(margin: Margin<H>): Margin<H> {
			return {
				[Length.LONG]: margin[Length.LONG],
				[Length.SHORT]: margin[Length.SHORT],
			};
		}
	}

	export type Cost<H extends HLike<H>> = Assets.Cost<H>;

	export interface Snapshot {
		assets: Assets.Snapshot;
		margin: Margin.Snapshot;
	}
}
