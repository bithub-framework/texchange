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
} from 'secretary-like';
import { EventEmitter } from 'events';
import { Context } from '../../context';
import { Instant } from '../instant';
import { Config } from './config';

import { Subscription } from '../../use-cases.d/subscription';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export class AccountLatency<H extends HLike<H>> implements AccountApiLike<H> {
	public spec: AccountSpec;
	public events = <AccountEventEmitterLike<H>>new EventEmitter();

	public constructor(
		@inject(TYPES.Context)
		private context: Context<H>,
		@inject(TYPES.UseCases)
		private useCases: AccountLatency.UseCaseDeps<H>,
		@inject(TYPES.Instant)
		private instant: Instant<H>,
		@inject(TYPES.DelayConfig)
		private config: Config,
	) {
		this.spec = this.context.spec.account;

		this.useCases.subscription.on('positions', async positions => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.events.emit('positions', this.context.Data.Positions.copy(positions));
			} catch (err) { }
		});

		this.useCases.subscription.on('balances', async balances => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.events.emit('balances', this.context.Data.Balances.copy(balances));
			} catch (err) { }
		});
	}

	public async makeOrders($orders: LimitOrder<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const orders = $orders.map(order => this.context.Data.LimitOrder.copy(order));
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.makeOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async amendOrders($amendments: Amendment<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const amendments = $amendments.map(amendment => this.context.Data.Amendment.copy(amendment));
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.amendOrders(amendments).map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async cancelOrders($orders: OpenOrder<H>[]): Promise<OpenOrder<H>[]> {
		try {
			const orders = $orders.map(order => this.context.Data.OpenOrder.copy(order));
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.cancelOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async getBalances(): Promise<Balances<H>> {
		try {
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.context.Data.Balances.copy(this.instant.getBalances());
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async getPositions(): Promise<Positions<H>> {
		try {
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.context.Data.Positions.copy(this.instant.getPositions());
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async getOpenOrders(): Promise<OpenOrder<H>[]> {
		try {
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.getOpenOrders().map(order =>
				order instanceof Error
					? order
					: this.context.Data.OpenOrder.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
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
