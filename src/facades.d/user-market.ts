import {
	MarketApiLike,
	MarketSpec,
	HLike,
	MarketEvents,
} from 'secretary-like';
import { EventEmitter } from 'events';
import { VirtualMachineContextLike } from '../vmctx';
import { LatencyConfig } from './latency-config';

import { UseCaseSubscription } from '../use-cases.d/subscription';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class UserMarketFacade<H extends HLike<H>> extends EventEmitter implements MarketApiLike<H> {
	public on!: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
	public once!: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
	public off!: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
	public emit!: <Event extends keyof MarketEvents<H>>(event: Event, ...args: MarketEvents<H>[Event]) => boolean;

	public PRICE_SCALE = this.marketSpec.PRICE_SCALE;
	public QUANTITY_SCALE = this.marketSpec.QUANTITY_SCALE;
	public CURRENCY_SCALE = this.marketSpec.CURRENCY_SCALE;
	public TICK_SIZE = this.marketSpec.TICK_SIZE;
	public MARKET_NAME = this.marketSpec.MARKET_NAME;

	public constructor(
		@inject(TYPES.vMCTX)
		private vMCTX: VirtualMachineContextLike<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.USE_CASES.subscription)
		private useCaseSubscription: UseCaseSubscription<H>,
		@inject(TYPES.FACADES.config)
		private config: LatencyConfig,
	) {
		super();

		this.useCaseSubscription.on('orderbook', async orderbook => {
			try {
				await this.vMCTX.timeline.sleep(this.config.processing);
				await this.vMCTX.timeline.sleep(this.config.ping);
				this.emit('orderbook', this.vMCTX.DataTypes.orderbookFactory.create(orderbook));
			} catch (err) { }
		});

		this.useCaseSubscription.on('trades', async trades => {
			try {
				await this.vMCTX.timeline.sleep(this.config.processing);
				await this.vMCTX.timeline.sleep(this.config.ping);
				this.emit('trades', trades.map(trade => this.vMCTX.DataTypes.tradeFactory.create(trade)));
			} catch (err) { }
		});

		this.useCaseSubscription.on('error', async err => {
			try {
				await this.vMCTX.timeline.sleep(this.config.processing);
				await this.vMCTX.timeline.sleep(this.config.ping);
				this.emit('error', err);
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
