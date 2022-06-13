import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { Subscription } from '../use-cases.d/subscription';
import { GetProgress } from '../use-cases.d/get-progress';

import { HLike } from 'secretary-like';
import { Context } from '../context';
import { Models } from './models';
import { Broadcast } from '../broadcast';
import { Tasks } from './tasks';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCases<H extends HLike<H>> {
	// public makeOrder: MakeOrder<H>;
	// public cancelOrder: CancelOrder<H>;
	// public amendOrder: AmendOrder<H>;
	// public getOpenOrders: GetOpenOrders<H>;
	// public getPositions: GetPositions<H>;
	// public getBalances: GetBalances<H>;
	// public updateOrderbook: UpdateOrderbook<H>;
	// public subscription: Subscription<H>;
	// public getProgress: GetProgress<H>;

	public constructor(
		// @inject(TYPES.Context)
		// context: Context<H>,
		// @inject(TYPES.Models)
		// models: Models<H>,
		// @inject(TYPES.Broadcast)
		// broadcast: Broadcast<H>,
		// @inject(TYPES.Tasks)
		// tasks: Tasks<H>,

		@inject(TYPES.USE_CASES.MakeOrder)
		public makeOrder: MakeOrder<H>,
		@inject(TYPES.USE_CASES.CancelOrder)
		public cancelOrder: CancelOrder<H>,
		@inject(TYPES.USE_CASES.AmendOrder)
		public amendOrder: AmendOrder<H>,
		@inject(TYPES.USE_CASES.GetOpenOrders)
		public getOpenOrders: GetOpenOrders<H>,
		@inject(TYPES.USE_CASES.GetPositions)
		public getPositions: GetPositions<H>,
		@inject(TYPES.USE_CASES.GetBalances)
		public getBalances: GetBalances<H>,
		@inject(TYPES.USE_CASES.UpdateOrderbook)
		public updateOrderbook: UpdateOrderbook<H>,
		@inject(TYPES.USE_CASES.Subscription)
		public subscription: Subscription<H>,
		@inject(TYPES.USE_CASES.GetProgress)
		public getProgress: GetProgress<H>,
		@inject(TYPES.USE_CASES.UpdateTrades)
		public updateTrades: UpdateTrades<H>,
	) {
		// this.amendOrder = new AmendOrder(context, models, broadcast, tasks);
		// this.cancelOrder = new CancelOrder(context, models, broadcast, tasks);
		// this.getBalances = new GetBalances(context, models, broadcast, tasks);
		// this.getOpenOrders = new GetOpenOrders(context, models, broadcast, tasks);
		// this.getPositions = new GetPositions(context, models, broadcast, tasks);
		// this.makeOrder = new MakeOrder(context, models, broadcast, tasks);
		// this.updateOrderbook = new UpdateOrderbook(context, models, broadcast, tasks);
		// this.subscription = new Subscription(context, models, broadcast, tasks);
		// this.getProgress = new GetProgress(context, models, broadcast, tasks);
	}
}
