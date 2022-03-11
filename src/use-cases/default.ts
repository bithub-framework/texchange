import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Broadcast } from '../broadcast';
import { TasksLike } from '../tasks/tasks-like';
import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { UseCasesLike } from './use-cases-like';


/**
 * 默认实时结算
 */
export class DefaultUseCases implements UseCasesLike {
	public readonly makeOrder: MakeOrder;
	public readonly cancelOrder: CancelOrder;
	public readonly amendOrder: AmendOrder;
	public readonly getOpenOrders: GetOpenOrders;
	public readonly getPositions: GetPositions;
	public readonly getBalances: GetBalances;
	public readonly updateOrderbook: UpdateOrderbook;
	public readonly updateTrades: UpdateTrades;

	constructor(
		context: Context,
		models: StatefulModels,
		broadcast: Broadcast,
		tasks: TasksLike,
	) {
		this.amendOrder = new AmendOrder(context, models, broadcast, tasks);
		this.cancelOrder = new CancelOrder(context, models, broadcast, tasks);
		this.getBalances = new GetBalances(context, models, broadcast, tasks);
		this.getOpenOrders = new GetOpenOrders(context, models, broadcast, tasks);
		this.getPositions = new GetPositions(context, models, broadcast, tasks);
		this.makeOrder = new MakeOrder(context, models, broadcast, tasks);
		this.updateOrderbook = new UpdateOrderbook(context, models, broadcast, tasks);
		this.updateTrades = new UpdateTrades(context, models, broadcast, tasks, true);
	}
}
