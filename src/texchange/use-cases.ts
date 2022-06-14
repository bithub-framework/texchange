import { UseCaseMakeOrder } from '../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../use-cases.d/amend-order';
import { UseCaseGetOpenOrders } from '../use-cases.d/get-open-orders';
import { UseCaseGetPositions } from '../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../use-cases.d/get-balances';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseSubscription } from '../use-cases.d/subscription';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';

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
		public makeOrder: UseCaseMakeOrder<H>,
		@inject(TYPES.USE_CASES.CancelOrder)
		public cancelOrder: UseCaseCancelOrder<H>,
		@inject(TYPES.USE_CASES.AmendOrder)
		public amendOrder: UseCaseAmendOrder<H>,
		@inject(TYPES.USE_CASES.GetOpenOrders)
		public getOpenOrders: UseCaseGetOpenOrders<H>,
		@inject(TYPES.USE_CASES.GetPositions)
		public getPositions: UseCaseGetPositions<H>,
		@inject(TYPES.USE_CASES.GetBalances)
		public getBalances: UseCaseGetBalances<H>,
		@inject(TYPES.USE_CASES.UpdateOrderbook)
		public updateOrderbook: UseCaseUpdateOrderbook<H>,
		@inject(TYPES.USE_CASES.Subscription)
		public subscription: UseCaseSubscription<H>,
		@inject(TYPES.USE_CASES.GetProgress)
		public getProgress: UseCaseGetProgress<H>,
		@inject(TYPES.USE_CASES.UpdateTrades)
		public updateTrades: UseCaseUpdateTrades<H>,
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
