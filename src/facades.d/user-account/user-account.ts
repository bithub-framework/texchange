import {
	LimitOrder,
	Balances,
	Positions,
	AccountApiLike,
	AccountSpec,
	HLike,
	OpenOrder,
	Amendment,
	AccountEvents,
	ExchangeUnavailable,
} from 'secretary-like';
import { ReadyState } from 'startable';
import { EventEmitter } from 'events';
import { VirtualMachineContextLike } from '../../vmctx';
import { Instant } from './instant';
import { AdminFacade } from '../admin';
import { LatencyConfig } from '../latency-config';
import assert = require('assert');

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
		@inject(TYPES.vmctx)
		private vmctx: VirtualMachineContextLike<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.USE_CASES.subscription)
		private useCaseSubscription: UseCaseSubscription<H>,
		@inject(TYPES.FACADES.instant)
		private instant: Instant<H>,
		@inject(TYPES.FACADES.admin)
		private adminFacade: AdminFacade<H>,
		@inject(TYPES.FACADES.config)
		private config: LatencyConfig,
	) {
		super();

		this.useCaseSubscription.on('positions', async positions => {
			try {
				await this.vmctx.timeline.sleep(this.config.processing);
				await this.vmctx.timeline.sleep(this.config.ping);
				this.emit('positions', this.vmctx.DataTypes.positionsFactory.create(positions));
			} catch (err) { }
		});

		this.useCaseSubscription.on('balances', async balances => {
			try {
				await this.vmctx.timeline.sleep(this.config.processing);
				await this.vmctx.timeline.sleep(this.config.ping);
				this.emit('balances', this.vmctx.DataTypes.balancesFactory.create(balances));
			} catch (err) { }
		});

		this.useCaseSubscription.on('error', async err => {
			try {
				await this.vmctx.timeline.sleep(this.config.processing);
				await this.vmctx.timeline.sleep(this.config.ping);
				this.emit('error', err);
			} catch (err) { }
		});
	}

	public async makeOrders($orders: LimitOrder.Source<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const orders = $orders.map(order => this.vmctx.DataTypes.limitOrderFactory.create(order));
			await this.vmctx.timeline.sleep(this.config.ping);
			await this.vmctx.timeline.sleep(this.config.processing);
			assert(
				this.adminFacade.$s.getReadyState() === ReadyState.STARTED,
				new ExchangeUnavailable(),
			);
			return this.instant.makeOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.vmctx.DataTypes.openOrderFactory.create(order),
			);
		} finally {
			await this.vmctx.timeline.sleep(this.config.ping);
		}
	}

	public async amendOrders($amendments: Amendment.Source<H>[]): Promise<(OpenOrder<H> | Error)[]> {
		try {
			const amendments = $amendments.map(amendment => this.vmctx.DataTypes.amendmentFactory.create(amendment));
			await this.vmctx.timeline.sleep(this.config.ping);
			await this.vmctx.timeline.sleep(this.config.processing);
			assert(
				this.adminFacade.$s.getReadyState() === ReadyState.STARTED,
				new ExchangeUnavailable(),
			);
			return this.instant.amendOrders(amendments).map(order =>
				order instanceof Error
					? order
					: this.vmctx.DataTypes.openOrderFactory.create(order),
			);
		} finally {
			await this.vmctx.timeline.sleep(this.config.ping);
		}
	}

	public async cancelOrders($orders: OpenOrder.Source<H>[]): Promise<OpenOrder<H>[]> {
		try {
			const orders = $orders.map(order => this.vmctx.DataTypes.openOrderFactory.create(order));
			await this.vmctx.timeline.sleep(this.config.ping);
			await this.vmctx.timeline.sleep(this.config.processing);
			assert(
				this.adminFacade.$s.getReadyState() === ReadyState.STARTED,
				new ExchangeUnavailable(),
			);
			return this.instant.cancelOrders(orders).map(order =>
				order instanceof Error
					? order
					: this.vmctx.DataTypes.openOrderFactory.create(order),
			);
		} finally {
			await this.vmctx.timeline.sleep(this.config.ping);
		}
	}

	public async getBalances(): Promise<Balances<H>> {
		try {
			await this.vmctx.timeline.sleep(this.config.ping);
			await this.vmctx.timeline.sleep(this.config.processing);
			assert(
				this.adminFacade.$s.getReadyState() === ReadyState.STARTED,
				new ExchangeUnavailable(),
			);
			return this.vmctx.DataTypes.balancesFactory.create(this.instant.getBalances());
		} finally {
			await this.vmctx.timeline.sleep(this.config.ping);
		}
	}

	public async getPositions(): Promise<Positions<H>> {
		try {
			await this.vmctx.timeline.sleep(this.config.ping);
			await this.vmctx.timeline.sleep(this.config.processing);
			assert(
				this.adminFacade.$s.getReadyState() === ReadyState.STARTED,
				new ExchangeUnavailable(),
			);
			return this.vmctx.DataTypes.positionsFactory.create(this.instant.getPositions());
		} finally {
			await this.vmctx.timeline.sleep(this.config.ping);
		}
	}

	public async getOpenOrders(): Promise<OpenOrder<H>[]> {
		try {

			await this.vmctx.timeline.sleep(this.config.ping);
			await this.vmctx.timeline.sleep(this.config.processing);
			assert(
				this.adminFacade.$s.getReadyState() === ReadyState.STARTED,
				new ExchangeUnavailable(),
			);
			return this.instant.getOpenOrders().map(order =>
				order instanceof Error
					? order
					: this.vmctx.DataTypes.openOrderFactory.create(order),
			);
		} finally {
			await this.vmctx.timeline.sleep(this.config.ping);
		}
	}
}
