import {
	MarketApiLike,
	MarketSpec,
	HLike,
	MarketEventEmitterLike,
} from 'secretary-like';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Config } from './config';

import { UseCaseSubscription } from '../use-cases.d/subscription';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class UserMarketFacade<H extends HLike<H>> implements MarketApiLike<H> {
	public spec: MarketSpec<H>;
	public events = <MarketEventEmitterLike<H>>new EventEmitter();

	public constructor(
		@inject(TYPES.Context)
		private context: Context<H>,
		@inject(TYPES.UseCases)
		private useCases: MarketLatency.UseCaseDeps<H>,
		@inject(TYPES.FACADES.Config)
		private config: Config,
	) {
		this.spec = this.context.spec.market;

		this.useCases.subscription.on('orderbook', async orderbook => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.events.emit('orderbook', this.context.Data.Orderbook.copy(orderbook));
			} catch (err) { }
		});

		this.useCases.subscription.on('trades', async trades => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.events.emit('trades', trades.map(trade => this.context.Data.Trade.copy(trade)));
			} catch (err) { }
		});
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.context.calc.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.context.calc.dollarVolume(price, quantity);
	}
}

export namespace MarketLatency {
	export interface UseCaseDeps<H extends HLike<H>> {
		subscription: UseCaseSubscription<H>;
	}
}
