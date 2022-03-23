import { Context } from '../context';
import { Models } from '../models/models';
import { Broadcast } from '../broadcast';
import { Tasks } from '../tasks/tasks';

import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { Subscription } from '../use-cases.d/subscription';

import { HLike } from 'interfaces';


export abstract class UseCases<H extends HLike<H>> {
	public readonly makeOrder: MakeOrder<H>;
	public readonly cancelOrder: CancelOrder<H>;
	public readonly amendOrder: AmendOrder<H>;
	public readonly getOpenOrders: GetOpenOrders<H>;
	public readonly getPositions: GetPositions<H>;
	public readonly getBalances: GetBalances<H>;
	public readonly updateOrderbook: UpdateOrderbook<H>;
	public abstract readonly updateTrades: UpdateTrades<H>;
	public readonly subscription: Subscription<H>;

	public constructor(
		context: Context<H>,
		models: Models<H>,
		broadcast: Broadcast<H>,
		tasks: Tasks<H>,
	) {
		this.amendOrder = new AmendOrder(context, models, broadcast, tasks);
		this.cancelOrder = new CancelOrder(context, models, broadcast, tasks);
		this.getBalances = new GetBalances(context, models, broadcast, tasks);
		this.getOpenOrders = new GetOpenOrders(context, models, broadcast, tasks);
		this.getPositions = new GetPositions(context, models, broadcast, tasks);
		this.makeOrder = new MakeOrder(context, models, broadcast, tasks);
		this.updateOrderbook = new UpdateOrderbook(context, models, broadcast, tasks);
		this.subscription = new Subscription(context, models, broadcast, tasks);
	}
}
