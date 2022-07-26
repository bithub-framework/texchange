import {
	LimitOrder,
	Balances,
	Positions,
	AccountApiLike,
	AccountSpec,
	MarketSpec,
	HLike,
	OpenOrder,
	Amendment,
	AccountEvents,
} from 'secretary-like';
import { EventEmitter } from 'events';
import { Context } from '../../context';
import { Instant } from './instant';
import { Config } from '../config';

import { UseCaseSubscription } from '../../use-cases.d/subscription';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export class UserAccountFacade<H extends HLike<H>> extends EventEmitter implements AccountApiLike<H> {
	public on!: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
	public once!: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
	public off!: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
	public emit!: <Event extends keyof AccountEvents<H>>(event: Event, ...args: AccountEvents<H>[Event]) => boolean;

	public LEVERAGE = this.accountSpec.LEVERAGE;
	public TAKER_FEE_RATE = this.accountSpec.TAKER_FEE_RATE;
	public MAKER_FEE_RATE = this.accountSpec.MAKER_FEE_RATE;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.USE_CASES.subscription)
		private useCaseSubscription: UseCaseSubscription<H>,
		@inject(TYPES.FACADES.instant)
		private instant: Instant<H>,
		@inject(TYPES.FACADES.config)
		private config: Config,
	) {
		super();

		this.useCaseSubscription.on('positions', async positions => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.emit('positions', this.context.Data.positionsFactory.copy(positions));
			} catch (err) { }
		});

		this.useCaseSubscription.on('balances', async balances => {
			try {
				await this.context.timeline.sleep(this.config.processing);
				await this.context.timeline.sleep(this.config.ping);
				this.emit('balances', this.context.Data.balancesFactory.copy(balances));
			} catch (err) { }
		});
	}

	public async makeOrders($orders: LimitOrder<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const orders = $orders.map(order => this.context.Data.limitOrderFactory.copy(order));
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.makeOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.context.Data.openOrderFactory.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async amendOrders($amendments: Amendment<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const amendments = $amendments.map(amendment => this.context.Data.amendmentFactory.copy(amendment));
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.amendOrders(amendments).map(order =>
				order instanceof Error
					? order
					: this.context.Data.openOrderFactory.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async cancelOrders($orders: OpenOrder<H>[]): Promise<OpenOrder<H>[]> {
		try {
			const orders = $orders.map(order => this.context.Data.openOrderFactory.copy(order));
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.instant.cancelOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.context.Data.openOrderFactory.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async getBalances(): Promise<Balances<H>> {
		try {
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.context.Data.balancesFactory.copy(this.instant.getBalances());
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public async getPositions(): Promise<Positions<H>> {
		try {
			await this.context.timeline.sleep(this.config.ping);
			await this.context.timeline.sleep(this.config.processing);
			return this.context.Data.positionsFactory.copy(this.instant.getPositions());
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
					: this.context.Data.openOrderFactory.copy(order),
			);
		} finally {
			await this.context.timeline.sleep(this.config.ping);
		}
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.marketSpec.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.marketSpec.dollarVolume(price, quantity);
	}
}
