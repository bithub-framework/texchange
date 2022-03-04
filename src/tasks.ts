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

import { Context } from './context';
import { Broadcast } from './broadcast';
import { Models } from './models';

import { MakeOpenOrder } from './tasks.d/make-open-order';
import { CancelOpenOrder } from './tasks.d/cancel-open-order';
import { DefaultGetAvailable } from './tasks.d/get-available.d/default';
import { GetBalances } from './tasks.d/get-balances';
import { GetClosable } from './tasks.d/get-closable';
import { GetPositions } from './tasks.d/get-positions';
import { OrderMakes } from './tasks.d/order-makes';
import { OrderTakes } from './tasks.d/order-takes';
import { DefaultSettle } from './tasks.d/settle.d/default';
import { TradeTakesOpenMakers } from './tasks.d/trade-takes-open-makers';
import { ValidateOrder } from './tasks.d/validate-order';


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
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
	) {
		this.cancelOpenOrder = new CancelOpenOrder(this.context, this.models, this.broadcast, this);
		this.getAvailable = new DefaultGetAvailable(this.context, this.models, this.broadcast, this);
		this.getBalances = new GetBalances(this.context, this.models, this.broadcast, this);
		this.getClosable = new GetClosable(this.context, this.models, this.broadcast, this);
		this.getPositions = new GetPositions(this.context, this.models, this.broadcast, this);
		this.makeOpenOrder = new MakeOpenOrder(this.context, this.models, this.broadcast, this);
		this.orderMakes = new OrderMakes(this.context, this.models, this.broadcast, this);
		this.orderTakes = new OrderTakes(this.context, this.models, this.broadcast, this);
		this.settle = new DefaultSettle(this.context, this.models, this.broadcast, this);
		this.tradeTakesOpenMakers = new TradeTakesOpenMakers(this.context, this.models, this.broadcast, this);
		this.validateOrder = new ValidateOrder(this.context, this.models, this.broadcast, this);
	}
}
