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
import { Clearinghouse } from '../tasks.d/settle/settle';
import { TaskMarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';

import { HLike } from 'secretary-like';

import { TYPES } from '../injection/types';
import { inject } from '@zimtsui/injektor';


export class Tasks<H extends HLike<H>>  {
	public constructor(
		@inject(TYPES.TASKS.getBalances)
		public getBalances: TaskGetBalances<H>,
		@inject(TYPES.TASKS.getPositions)
		public getPositions: TaskGetPositions<H>,
		@inject(TYPES.TASKS.getAvailable)
		public getAvailable: TaskGetAvailable<H>,
		@inject(TYPES.TASKS.getClosable)
		public getClosable: TaskGetClosable<H>,
		@inject(TYPES.TASKS.settle)
		public settle: Clearinghouse<H>,
		@inject(TYPES.TASKS.orderMakes)
		public orderMakes: TaskOrderMakes<H>,
		@inject(TYPES.TASKS.tradeTakesOpenMakers)
		public tradeTakesOpenMakers: TaskTradeTakesOpenMakers<H>,
		@inject(TYPES.TASKS.orderTakes)
		public orderTakes: TaskOrderTakes<H>,
		@inject(TYPES.TASKS.validateOrder)
		public validateOrder: TaskValidateOrder<H>,
		@inject(TYPES.TASKS.makeOpenOrder)
		public makeOpenOrder: TaskMakeOpenOrder<H>,
		@inject(TYPES.TASKS.cancelOpenOrder)
		public cancelOpenOrder: TaskCancelOpenOrder<H>,
		@inject(TYPES.TASKS.marginAccumulation)
		public marginAccumulation: TaskMarginAccumulation<H>,
		@inject(TYPES.TASKS.orderVolumes)
		public orderVolumes: TaskOrderVolumes<H>,
	) { }
}
