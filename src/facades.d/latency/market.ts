import {
	MarketApiLike,
	MarketSpec,
	HLike,
	OrderbookStatic,
	TradeStatic,
	TradeId,
	OrderId,
	MarketEventEmitterLike,
} from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../../context';

import { Subscription } from '../../use-cases.d/subscription';


export class MarketLatency<H extends HLike<H>> implements MarketApiLike<H> {
	public spec: MarketSpec<H>;
	public events = <MarketEventEmitterLike<H>>new EventEmitter();

	private Orderbook = new OrderbookStatic(this.context.H);
	private Trade = new TradeStatic(this.context.H);

	public constructor(
		private context: Context<H>,
		private useCases: MarketLatency.UseCaseDeps<H>,
	) {
		this.spec = this.context.config.market;

		this.useCases.subscription.on('orderbook', async orderbook => {
			try {
				await this.context.timeline.sleep(this.context.config.market.PROCESSING);
				await this.context.timeline.sleep(this.context.config.market.PING);
				this.events.emit('orderbook', this.Orderbook.copy(orderbook));
			} catch (err) {
				this.events.emit('error', <Error>err);
			}
		});

		this.useCases.subscription.on('trades', async trades => {
			try {
				await this.context.timeline.sleep(this.context.config.market.PROCESSING);
				await this.context.timeline.sleep(this.context.config.market.PING);
				this.events.emit('trades', trades.map(trade => this.Trade.copy(trade)));
			} catch (err) {
				this.events.emit('error', <Error>err);
			}
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
		subscription: Subscription<H>;
	}
}
