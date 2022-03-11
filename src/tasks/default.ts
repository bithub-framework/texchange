import {
	TasksLike,
	GetBalancesLike,
	GetPositionsLike,
	GetAvailableLike,
	GetClosableLike,
	SettleLike,
	OrderMakesLike,
	TradeTakesOpenMakersLike,
	OrderTakesLike,
	ValidateOrderLike,
	MakeOpenOrderLike,
	CancelOpenOrderLike,
	MarginAccumulationLike,
	OrderVolumesLike,
} from './tasks-like';

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { StatefulModels } from '../models/stateful-models';

import { MakeOpenOrder } from '../tasks.d/make-open-order';
import { CancelOpenOrder } from '../tasks.d/cancel-open-order';
import { DefaultGetAvailable } from '../tasks.d/get-available';
import { GetBalances } from '../tasks.d/get-balances';
import { GetClosable } from '../tasks.d/get-closable';
import { GetPositions } from '../tasks.d/get-positions';
import { OrderMakes } from '../tasks.d/order-makes';
import { OrderTakes } from '../tasks.d/order-takes';
import { DefaultSettle } from '../tasks.d/settle';
import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers';
import { ValidateOrder } from '../tasks.d/validate-order';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation';
import { OrderVolumes } from '../tasks.d/order-volumes';


export class DefaultTasks implements TasksLike {
	public readonly getBalances: GetBalancesLike;
	public readonly getPositions: GetPositionsLike;
	public readonly getAvailable: GetAvailableLike;
	public readonly getClosable: GetClosableLike;
	public readonly settle: SettleLike;
	public readonly orderMakes: OrderMakesLike;
	public readonly tradeTakesOpenMakers: TradeTakesOpenMakersLike;
	public readonly orderTakes: OrderTakesLike;
	public readonly validateOrder: ValidateOrderLike;
	public readonly makeOpenOrder: MakeOpenOrderLike;
	public readonly cancelOpenOrder: CancelOpenOrderLike;
	public readonly marginAccumulation: MarginAccumulationLike;
	public readonly orderVolumes: OrderVolumesLike;

	constructor(
		context: Context,
		models: StatefulModels,
		broadcast: Broadcast,
	) {
		this.cancelOpenOrder = new CancelOpenOrder(context, models, broadcast, this);
		this.getAvailable = new DefaultGetAvailable(context, models, broadcast, this);
		this.getBalances = new GetBalances(context, models, broadcast, this);
		this.getClosable = new GetClosable(context, models, broadcast, this);
		this.getPositions = new GetPositions(context, models, broadcast, this);
		this.makeOpenOrder = new MakeOpenOrder(context, models, broadcast, this);
		this.orderMakes = new OrderMakes(context, models, broadcast, this);
		this.orderTakes = new OrderTakes(context, models, broadcast, this);
		this.settle = new DefaultSettle(context, models, broadcast, this);
		this.tradeTakesOpenMakers = new TradeTakesOpenMakers(context, models, broadcast, this);
		this.validateOrder = new ValidateOrder(context, models, broadcast, this);
		this.marginAccumulation = new DefaultMarginAccumulation(context, models, broadcast, this);
		this.orderVolumes = new OrderVolumes(context, models, broadcast, this);
	}
}
