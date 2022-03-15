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
import { HLike } from 'interfaces';


/**
 * 默认实时结算
 */
export class DefaultUseCases<H extends HLike<H>>
	implements UseCasesLike<H> {
	public readonly makeOrder: MakeOrder<H>;
	public readonly cancelOrder: CancelOrder<H>;
	public readonly amendOrder: AmendOrder<H>;
	public readonly getOpenOrders: GetOpenOrders<H>;
	public readonly getPositions: GetPositions<H>;
	public readonly getBalances: GetBalances<H>;
	public readonly updateOrderbook: UpdateOrderbook<H>;
	public readonly updateTrades: UpdateTrades<H>;

	constructor(
		context: Context<H>,
		models: StatefulModels<H>,
		broadcast: Broadcast<H>,
		tasks: TasksLike<H>,
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
