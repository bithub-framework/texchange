import { TaskMakeOpenOrder } from '../tasks.d/make-open-order';
import { TaskCancelOpenOrder } from '../tasks.d/cancel-open-order';
import { TaskGetBalances } from '../tasks.d/get-balances';
import { TaskGetClosable } from '../tasks.d/get-closable';
import { TaskGetPositions } from '../tasks.d/get-positions';
import { TaskOrderMakes } from '../tasks.d/order-makes';
import { TaskOrderTakes } from '../tasks.d/order-takes';
import { TaskTradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers';
import { TaskValidateOrder } from '../tasks.d/validate-order';
import { TaskOrderVolumes } from '../tasks.d/order-volumes';
import { TaskGetAvailable } from '../tasks.d/get-available/get-available';
import { TaskSettle } from '../tasks.d/settle/settle';
import { TaskMarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';

import { HLike } from 'secretary-like';

import { TYPES } from '../injection/types';
import { inject } from '@zimtsui/injektor';


export class Tasks<H extends HLike<H>>  {
	public constructor(
		@inject(TYPES.TASKS.GetBalances)
		public getBalances: TaskGetBalances<H>,
		@inject(TYPES.TASKS.GetPositions)
		public getPositions: TaskGetPositions<H>,
		@inject(TYPES.TASKS.GetAvailable)
		public getAvailable: TaskGetAvailable<H>,
		@inject(TYPES.TASKS.GetClosable)
		public getClosable: TaskGetClosable<H>,
		@inject(TYPES.TASKS.Settle)
		public settle: TaskSettle<H>,
		@inject(TYPES.TASKS.OrderMakes)
		public orderMakes: TaskOrderMakes<H>,
		@inject(TYPES.TASKS.TradeTakesOpenMakers)
		public tradeTakesOpenMakers: TaskTradeTakesOpenMakers<H>,
		@inject(TYPES.TASKS.OrderTakes)
		public orderTakes: TaskOrderTakes<H>,
		@inject(TYPES.TASKS.ValidateOrder)
		public validateOrder: TaskValidateOrder<H>,
		@inject(TYPES.TASKS.MakeOpenOrder)
		public makeOpenOrder: TaskMakeOpenOrder<H>,
		@inject(TYPES.TASKS.CancelOpenOrder)
		public cancelOpenOrder: TaskCancelOpenOrder<H>,
		@inject(TYPES.TASKS.MarginAccumulation)
		public marginAccumulation: TaskMarginAccumulation<H>,
		@inject(TYPES.TASKS.OrderVolumes)
		public orderVolumes: TaskOrderVolumes<H>,
	) { }
}
