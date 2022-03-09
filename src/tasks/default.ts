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
} from './tasks-like';

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { ModelsStatic } from '../models/models-static';

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

	constructor(
		context: Context,
		models: ModelsStatic,
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
	}
}
