import { MakeOrder } from './use-cases.d/make-order';
import { CancelOrder } from './use-cases.d/cancel-order';
import { AmendOrder } from './use-cases.d/amend-order';
import { GetOpenOrders } from './use-cases.d/get-open-orders';
import { GetPositions } from './use-cases.d/get-positions';
import { GetBalances } from './use-cases.d/get-balances';
import { UpdateOrderbook } from './use-cases.d/update-orderbook';
import { UpdateTrades } from './use-cases.d/update-trades';
import { Subscription } from './use-cases.d/subscription';
import { GetProgress } from './use-cases.d/get-progress';
import { HLike } from 'interfaces';
import { Context } from './context';
import { Models } from './models';
import { Broadcast } from './broadcast';
import { Tasks } from './tasks/tasks';

import { inject } from 'injektor';



export class UseCases<H extends HLike<H>> {
	public makeOrder: MakeOrder<H>;
	public cancelOrder: CancelOrder<H>;
	public amendOrder: AmendOrder<H>;
	public getOpenOrders: GetOpenOrders<H>;
	public getPositions: GetPositions<H>;
	public getBalances: GetBalances<H>;
	public updateOrderbook: UpdateOrderbook<H>;
	public subscription: Subscription<H>;
	public getProgress: GetProgress<H>;

	public constructor(
		@inject(Context)
		context: Context<H>,
		@inject(Models)
		models: Models<H, unknown>,
		@inject(Broadcast)
		broadcast: Broadcast<H>,
		@inject(Tasks)
		tasks: Tasks<H>,
		@inject(UpdateTrades)
		public updateTrades: UpdateTrades<H>,
	) {
		this.amendOrder = new AmendOrder(context, models, broadcast, tasks);
		this.cancelOrder = new CancelOrder(context, models, broadcast, tasks);
		this.getBalances = new GetBalances(context, models, broadcast, tasks);
		this.getOpenOrders = new GetOpenOrders(context, models, broadcast, tasks);
		this.getPositions = new GetPositions(context, models, broadcast, tasks);
		this.makeOrder = new MakeOrder(context, models, broadcast, tasks);
		this.updateOrderbook = new UpdateOrderbook(context, models, broadcast, tasks);
		this.subscription = new Subscription(context, models, broadcast, tasks);
		this.getProgress = new GetProgress(context, models, broadcast, tasks);
	}
}
