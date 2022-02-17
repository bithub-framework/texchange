"use strict";
// import { EventEmitter } from 'events';
// import { Context } from './context/context';
// import { Models } from './models/models';
// import { Mtm, DefaultMtm } from './controllers/mtm';
// import { Clearing } from './controllers/clearing';
// import { Taking } from './controllers/taking';
// import { Taken } from './controllers/taken';
// import { Making } from './controllers/making';
// import { Validation } from './controllers/validation';
// import { AccountView } from './controllers/account-view';
// import { Ordering } from './controllers/ordering';
// import { Updating } from './controllers/updating';
// import {
// 	LimitOrder,
// 	OpenOrder,
// 	Amendment,
// 	DatabaseTrade,
// 	Orderbook,
// 	Trade,
// 	Positions,
// 	Balances,
// 	Length,
// } from './interfaces';
// import assert = require('assert');
// export type Stages = {
// 	[model in keyof Models]: boolean;
// }
// export class Scheduler extends EventEmitter {
// 	protected mtm: Mtm;
// 	protected clearing: Clearing;
// 	private making: Making;
// 	private taking: Taking;
// 	private taken: Taken;
// 	private accountView: AccountView;
// 	private validation: Validation;
// 	private ordering: Ordering;
// 	private updating: Updating;
// 	private initialStages: Stages = {
// 		assets: false,
// 		margin: false,
// 		makers: false,
// 		progress: false,
// 		book: false,
// 		pricing: false,
// 	}
// 	private readonly stages: Stages = { ...this.initialStages };
// 	constructor(
// 		private context: Context,
// 		private models: Models,
// 	) {
// 		super();
// 		this.taking = new Taking(context, models, this.stages);
// 		this.making = new Making(context, models, this.stages);
// 		this.taken = new Taken(context, models, this.stages);
// 		this.clearing = new Clearing(context, models, this.stages);
// 		this.mtm = new DefaultMtm(context, models, this.stages, this.clearing);
// 		this.accountView = new AccountView(context, models, this.stages);
// 		this.validation = new Validation(context, models, this.stages, this.accountView);
// 		this.ordering = new Ordering(context, models, this.stages, this.validation, this.taking, this.making);
// 		this.updating = new Updating(context, models, this.stages, this.taken);
// 		this.updating.on('pushTrades', trades => {
// 			this.emit('pushTrades', trades);
// 		});
// 		this.updating.on('pushOrderbook', () => {
// 			this.emit('pushOrderbook', models.book.getBook());
// 		});
// 		this.ordering.on('pushTrades', trades => {
// 			this.emit('pushTrades', trades);
// 		});
// 		this.ordering.on('pushOrderbook', () => {
// 			this.emit('pushOrderbook', models.book.getBook());
// 		});
// 		this.ordering.on('pushPositions', () => {
// 			this.emit('pushPositions', {
// 				position: {
// 					[Length.LONG]: models.assets.position[Length.LONG],
// 					[Length.SHORT]: models.assets.position[Length.SHORT],
// 				},
// 				closable: this.accountView.getClosable(),
// 				time: context.timeline.now(),
// 			});
// 		});
// 		this.ordering.on('pushBalances', () => {
// 			this.emit('pushBalances', {
// 				balance: models.assets.balance,
// 				available: this.accountView.getAvailable(),
// 				time: context.timeline.now(),
// 			});
// 		});
// 	}
// 	private initializeStages<Involved extends keyof Models>(involved: Involved[]): void {
// 		for (const modelName of involved)
// 			this.stages[modelName] = this.initialStages[modelName];
// 	}
// 	public makeOrder(order: Readonly<LimitOrder>): OpenOrder {
// 		const involved = [...Ordering.involved];
// 		this.initializeStages(involved);
// 		return this.ordering.makeOrder(order);
// 	}
// 	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
// 		const involved = [...Ordering.involved];
// 		this.initializeStages(involved);
// 		return this.ordering.cancelOrder(order);
// 	}
// 	public amendOrder(amendment: Readonly<Amendment>): OpenOrder {
// 		const involved = [...Ordering.involved];
// 		this.initializeStages(involved);
// 		return this.ordering.amendOrder(amendment);
// 	}
// 	public getOpenOrders(): OpenOrder[] {
// 		const openOrders = [...this.models.makers.values()];
// 		return openOrders.map(order => ({
// 			price: order.price,
// 			quantity: order.quantity,
// 			side: order.side,
// 			length: order.length,
// 			operation: order.operation,
// 			id: order.id,
// 			filled: order.filled,
// 			unfilled: order.unfilled,
// 		}));
// 	}
// 	public getPositions(): Positions {
// 		return {
// 			position: {
// 				[Length.LONG]: this.models.assets.position[Length.LONG],
// 				[Length.SHORT]: this.models.assets.position[Length.SHORT],
// 			},
// 			closable: this.accountView.getClosable(),
// 			time: this.context.timeline.now(),
// 		};
// 	}
// 	public getBalances(): Balances {
// 		return {
// 			balance: this.models.assets.balance,
// 			available: this.accountView.getAvailable(),
// 			time: this.context.timeline.now(),
// 		};
// 	}
// 	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
// 		const involved = [...Updating.involved];
// 		this.initializeStages(involved);
// 		this.updating.updateTrades(trades);
// 	}
// 	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
// 		const involved = [...Updating.involved];
// 		this.initializeStages(involved);
// 		this.updating.updateOrderbook(orderbook);
// 	}
// }
// type Events = {
// 	pushTrades: [readonly Readonly<Trade>[]];
// 	pushOrderbook: [Readonly<Orderbook>];
// 	pushPositions: [Readonly<Positions>];
// 	pushBalances: [Readonly<Balances>];
// }
// export interface Scheduler extends EventEmitter {
// 	on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
// 	once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
// 	off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
// 	emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
// }
//# sourceMappingURL=scheduler.js.map