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
		@inject(TYPES.USE_CASES.makeOrder)
		public makeOrder: UseCaseMakeOrder<H>,
		@inject(TYPES.USE_CASES.cancelOrder)
		public cancelOrder: UseCaseCancelOrder<H>,
		@inject(TYPES.USE_CASES.amendOrder)
		public amendOrder: UseCaseAmendOrder<H>,
		@inject(TYPES.USE_CASES.getOpenOrders)
		public getOpenOrders: UseCaseGetOpenOrders<H>,
		@inject(TYPES.USE_CASES.getPositions)
		public getPositions: UseCaseGetPositions<H>,
		@inject(TYPES.USE_CASES.getBalances)
		public getBalances: UseCaseGetBalances<H>,
		@inject(TYPES.USE_CASES.updateOrderbook)
		public updateOrderbook: UseCaseUpdateOrderbook<H>,
		@inject(TYPES.USE_CASES.subscription)
		public subscription: UseCaseSubscription<H>,
		@inject(TYPES.USE_CASES.getProgress)
		public getProgress: UseCaseGetProgress<H>,
		@inject(TYPES.USE_CASES.updateTrades)
		public updateTrades: UseCaseUpdateTrades<H>,
	) { }
}
