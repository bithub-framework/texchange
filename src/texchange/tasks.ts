import { Context } from '../context';
import { Models } from './models';
import { Broadcast } from '../broadcast';

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

// import { MakeOpenOrder } from '../tasks.d/make-open-order/make-open-order';
// import { CancelOpenOrder } from '../tasks.d/cancel-open-order/cancel-open-order';
// import { GetBalances } from '../tasks.d/get-balances/get-balances';
// import { GetClosable } from '../tasks.d/get-closable/get-closable';
// import { GetPositions } from '../tasks.d/get-positions/get-positions';
// import { OrderMakes } from '../tasks.d/order-makes/order-makes';
// import { OrderTakes } from '../tasks.d/order-takes/order-takes';
// import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers';
// import { ValidateOrder } from '../tasks.d/validate-order/validate-order';
// import { OrderVolumes } from '../tasks.d/order-volumes/order-volumes';
// import { GetAvailable } from '../tasks.d/get-available/get-available';
// import { MarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';
// import { Settle } from '../tasks.d/settle/settle';

import { HLike } from 'secretary-like';

import { TYPES } from '../injection/types';
import { instantInject } from '@zimtsui/injektor';


export class Tasks<H extends HLike<H>>  {
	@instantInject(TYPES.TASKS.GetBalances)
	public getBalances!: TaskGetBalances<H>;
	@instantInject(TYPES.TASKS.GetPositions)
	public getPositions!: TaskGetPositions<H>;
	@instantInject(TYPES.TASKS.GetAvailable)
	public getAvailable!: TaskGetAvailable<H>;
	@instantInject(TYPES.TASKS.GetClosable)
	public getClosable!: TaskGetClosable<H>;
	@instantInject(TYPES.TASKS.Settle)
	public settle!: TaskSettle<H>;
	@instantInject(TYPES.TASKS.OrderMakes)
	public orderMakes!: TaskOrderMakes<H>;
	@instantInject(TYPES.TASKS.TradeTakesOpenMakers)
	public tradeTakesOpenMakers!: TaskTradeTakesOpenMakers<H>;
	@instantInject(TYPES.TASKS.OrderTakes)
	public orderTakes!: TaskOrderTakes<H>;
	@instantInject(TYPES.TASKS.ValidateOrder)
	public validateOrder!: TaskValidateOrder<H>;
	@instantInject(TYPES.TASKS.MakeOpenOrder)
	public makeOpenOrder!: TaskMakeOpenOrder<H>;
	@instantInject(TYPES.TASKS.CancelOpenOrder)
	public cancelOpenOrder!: TaskCancelOpenOrder<H>;
	@instantInject(TYPES.TASKS.MarginAccumulation)
	public marginAccumulation!: TaskMarginAccumulation<H>;
	@instantInject(TYPES.TASKS.OrderVolumes)
	public orderVolumes!: TaskOrderVolumes<H>;

	public constructor(
	) {
		// this.getBalances = new GetBalances(context, models, broadcast, this);
		// this.getPositions = new GetPositions(context, models, broadcast, this);
		// this.getClosable = new GetClosable(context, models, broadcast, this);
		// this.orderMakes = new OrderMakes(context, models, broadcast, this);
		// this.tradeTakesOpenMakers = new TradeTakesOpenMakers(context, models, broadcast, this);
		// this.orderTakes = new OrderTakes(context, models, broadcast, this);
		// this.validateOrder = new ValidateOrder(context, models, broadcast, this);
		// this.makeOpenOrder = new MakeOpenOrder(context, models, broadcast, this);
		// this.cancelOpenOrder = new CancelOpenOrder(context, models, broadcast, this);
		// this.orderVolumes = new OrderVolumes(context, models, broadcast, this);
	}
}
