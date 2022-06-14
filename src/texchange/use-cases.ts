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

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCases<H extends HLike<H>> {
	public constructor(
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
	) { }
}
