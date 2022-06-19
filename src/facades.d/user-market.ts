import {
	MarketApiLike,
	MarketSpec,
	HLike,
	MarketEventEmitterLike,
	MarketEvents,
} from 'secretary-like';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Config } from './config';

import { UseCaseSubscription } from '../use-cases.d/subscription';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class UserMarketFacade<H extends HLike<H>> extends EventEmitter implements MarketApiLike<H> {
	public on!: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
	public once!: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
	public off!: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
	public emit!: <Event extends keyof MarketEvents<H>>(event: Event, ...args: MarketEvents<H>[Event]) => boolean;

	public PRICE_DP = this.marketSpec.PRICE_DP;
	public QUANTITY_DP = this.marketSpec.QUANTITY_DP;
	public CURRENCY_DP = this.marketSpec.CURRENCY_DP;
	public TICK_SIZE = this.marketSpec.TICK_SIZE;
	public MARKET_NAME = this.marketSpec.MARKET_NAME;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.useCases)
		private useCases: UserMarketFacade.UseCaseDeps<H>,
		@inject(TYPES.FACADES.config)
		private config: Config,
	) {
		super();

		this.useCases.subscription.on('orderbook', async orderbook => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.emit('orderbook', this.context.Data.Orderbook.copy(orderbook));
			} catch (err) { }
		});

		this.useCases.subscription.on('trades', async trades => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.emit('trades', trades.map(trade => this.context.Data.Trade.copy(trade)));
			} catch (err) { }
		});
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.marketSpec.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.marketSpec.dollarVolume(price, quantity);
	}
}


export namespace UserMarketFacade {
	export interface UseCaseDeps<H extends HLike<H>> {
		subscription: UseCaseSubscription<H>;
	}
}
