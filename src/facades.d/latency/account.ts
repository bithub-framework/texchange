import {
	LimitOrder,
	Balances,
	Positions,
	AccountApiLike,
	AccountSpec,
	HLike,
	OpenOrder,
	Amendment,
	AccountEventEmitterLike,
} from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../../context';
import { Instant } from '../instant';

import { Subscription } from '../../use-cases.d/subscription';


export class AccountLatency<H extends HLike<H>> implements AccountApiLike<H> {
	public spec: AccountSpec;
	public events = <AccountEventEmitterLike<H>>new EventEmitter();

	public constructor(
		private context: Context<H>,
		private useCases: AccountLatency.UseCaseDeps<H>,
		private instant: Instant<H>,
	) {
		this.spec = this.context.config.account;

		this.useCases.subscription.on('positions', async positions => {
			try {
				await this.context.timeline.sleep(this.context.config.market.PROCESSING);
				await this.context.timeline.sleep(this.context.config.market.PING);
				this.events.emit('positions', this.context.Data.Positions.copy(positions));
			} catch (err) { }
		});

		this.useCases.subscription.on('balances', async balances => {
			try {
				await this.context.timeline.sleep(this.context.config.market.PROCESSING);
				await this.context.timeline.sleep(this.context.config.market.PING);
				this.events.emit('balances', this.context.Data.Balances.copy(balances));
			} catch (err) { }
		});
	}

	public async makeOrders($orders: LimitOrder<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const orders = $orders.map(order => this.context.Data.LimitOrder.copy(order));
			await this.context.timeline.sleep(this.context.config.market.PING);
			await this.context.timeline.sleep(this.context.config.market.PROCESSING);
			return this.instant.makeOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.context.config.market.PING);
		}
	}

	public async amendOrders($amendments: Amendment<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const amendments = $amendments.map(amendment => this.context.Data.Amendment.copy(amendment));
			await this.context.timeline.sleep(this.context.config.market.PING);
			await this.context.timeline.sleep(this.context.config.market.PROCESSING);
			return this.instant.amendOrders(amendments).map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.context.config.market.PING);
		}
	}

	public async cancelOrders($orders: OpenOrder<H>[]): Promise<OpenOrder<H>[]> {
		try {
			const orders = $orders.map(order => this.context.Data.OpenOrder.copy(order));
			await this.context.timeline.sleep(this.context.config.market.PING);
			await this.context.timeline.sleep(this.context.config.market.PROCESSING);
			return this.instant.cancelOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.context.config.market.PING);
		}
	}

	public async getBalances(): Promise<Balances<H>> {
		try {
			await this.context.timeline.sleep(this.context.config.market.PING);
			await this.context.timeline.sleep(this.context.config.market.PROCESSING);
			return this.context.Data.Balances.copy(this.instant.getBalances());
		} finally {
			await this.context.timeline.sleep(this.context.config.market.PING);
		}
	}

	public async getPositions(): Promise<Positions<H>> {
		try {
			await this.context.timeline.sleep(this.context.config.market.PING);
			await this.context.timeline.sleep(this.context.config.market.PROCESSING);
			return this.context.Data.Positions.copy(this.instant.getPositions());
		} finally {
			await this.context.timeline.sleep(this.context.config.market.PING);
		}
	}

	public async getOpenOrders(): Promise<OpenOrder<H>[]> {
		try {
			await this.context.timeline.sleep(this.context.config.market.PING);
			await this.context.timeline.sleep(this.context.config.market.PROCESSING);
			return this.instant.getOpenOrders().map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.context.config.market.PING);
		}
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.context.calc.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.context.calc.dollarVolume(price, quantity);
	}
}

export namespace AccountLatency {
	export interface UseCaseDeps<H extends HLike<H>> {
		subscription: Subscription<H>;
	}
}
