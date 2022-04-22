import { HLike, HStatic } from 'interfaces';
import { Startable, StartableLike } from 'startable';
import { StatefulLike } from '../stateful-like';
import { Container } from 'injektor';
import { TYPES } from '../types';
import { EventEmitter } from 'events';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';

// Models
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';

import { Models } from '../models';

// Broadcast
import { Broadcast } from '../broadcast';

// Tasks
import { MakeOpenOrder } from '../tasks.d/make-open-order/make-open-order';
import { CancelOpenOrder } from '../tasks.d/cancel-open-order/cancel-open-order';
import { GetBalances as GetBalancesTask } from '../tasks.d/get-balances/get-balances';
import { GetClosable } from '../tasks.d/get-closable/get-closable';
import { GetPositions as GetPositionsTask } from '../tasks.d/get-positions/get-positions';
import { OrderMakes } from '../tasks.d/order-makes/order-makes';
import { OrderTakes } from '../tasks.d/order-takes/order-takes';
import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers';
import { ValidateOrder } from '../tasks.d/validate-order/validate-order';
import { OrderVolumes } from '../tasks.d/order-volumes/order-volumes';
import { GetAvailable } from '../tasks.d/get-available/get-available';
import { Settle } from '../tasks.d/settle/settle';
import { MarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';

import { Tasks } from '../tasks/tasks';

// Mark to market
import { Mtm } from '../mark-to-market/mtm';

// UseCases
import { UseCases } from '../use-cases';

// Facades
import { Facades } from '../facades';

// Controller
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';


export abstract class Texchange<
	H extends HLike<H>,
	PricingSnapshot,
	> implements StatefulLike<Snapshot<PricingSnapshot>> {

	protected c = new Container();
	protected abstract models: Models<H, PricingSnapshot>;
	protected broadcast = <Broadcast<H>>new EventEmitter();
	protected abstract mtm: Mtm<H> | null;
	public abstract user: Latency<H>;
	public abstract admin: Joystick<H>;
	public startable: StartableLike;

	public constructor(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
	) {
		this.c.rfs(
			Context,
			() => new Context(
				config,
				timeline,
				H,
			),
		);

		this.c.rcs(
			Models,
			Models,
		);

		this.c.rv(
			TYPES.Broadcast,
			this.broadcast,
		);

		this.c.ra(MakeOpenOrder.TaskDeps, Tasks);
		this.c.ra(CancelOpenOrder.TaskDeps, Tasks);
		this.c.ra(GetBalancesTask.TaskDeps, Tasks);
		this.c.ra(GetClosable.TaskDeps, Tasks);
		this.c.ra(GetPositionsTask.TaskDeps, Tasks);
		this.c.ra(OrderMakes.TaskDeps, Tasks);
		this.c.ra(OrderTakes.TaskDeps, Tasks);
		this.c.ra(TradeTakesOpenMakers.TaskDeps, Tasks);
		this.c.ra(ValidateOrder.TaskDeps, Tasks);
		this.c.ra(OrderVolumes.TaskDeps, Tasks);
		this.c.ra(GetAvailable.TaskDeps, Tasks);
		this.c.ra(Settle.TaskDeps, Tasks);
		this.c.ra(MarginAccumulation.TaskDeps, Tasks);

		this.c.rcs(TYPES.MakeOpenOrderLike, MakeOpenOrder);
		this.c.rcs(TYPES.CancelOpenOrderLike, CancelOpenOrder);
		this.c.rcs(TYPES.GetBalancesLike, GetBalancesTask);
		this.c.rcs(TYPES.GetClosableLike, GetClosable);
		this.c.rcs(TYPES.GetPositionsLike, GetPositionsTask);
		this.c.rcs(TYPES.OrderMakesLike, OrderMakes);
		this.c.rcs(TYPES.OrderTakesLike, OrderTakes);
		this.c.rcs(TYPES.TradeTakesOpenMakersLike, TradeTakesOpenMakers);
		this.c.rcs(TYPES.ValidateOrderLike, ValidateOrder);
		this.c.rcs(TYPES.OrderVolumesLike, OrderVolumes);

		this.c.rcs(
			UseCases,
			UseCases,
		);

		this.c.registerConstructorSingleton(
			Facades,
			Facades,
		);

		this.startable = Startable.create(
			() => this.start(),
			() => this.stop(),
		);
	}

	private async start() {
		if (this.mtm)
			await this.mtm.startable.start(this.startable.stop);
	}

	private async stop() {
		if (this.mtm)
			await this.mtm.startable.stop();
	}

	public capture(): Snapshot<PricingSnapshot> {
		return {
			assets: this.models.assets.capture(),
			margins: this.models.margins.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	public restore(snapshot: Snapshot<PricingSnapshot>): void {
		this.models.assets.restore(snapshot.assets);
		this.models.margins.restore(snapshot.margins);
		this.models.makers.restore(snapshot.makers);
		this.models.book.restore(snapshot.book);
		this.models.pricing.restore(snapshot.pricing);
		this.models.progress.restore(snapshot.progress);
	}
}


// export interface Tasks<H extends HLike<H>> {
// 	getBalances: GetBalancesLike<H>;
// 	getPositions: GetPositionsLike<H>;
// 	getAvailable: GetAvailableLike<H>;
// 	getClosable: GetClosableLike<H>;
// 	settle: SettleLike;
// 	orderMakes: OrderMakesLike<H>;
// 	tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
// 	orderTakes: OrderTakesLike<H>;
// 	validateOrder: ValidateOrderLike<H>;
// 	makeOpenOrder: MakeOpenOrderLike<H>;
// 	cancelOpenOrder: CancelOpenOrderLike<H>;
// 	marginAccumulation: MarginAccumulationLike<H>;
// 	orderVolumes: OrderVolumesLike<H>;
// }

// export interface UseCases<H extends HLike<H>> {
// 	makeOrder: MakeOrder<H>;
// 	cancelOrder: CancelOrder<H>;
// 	amendOrder: AmendOrder<H>;
// 	getOpenOrders: GetOpenOrders<H>;
// 	getPositions: GetPositionsUseCase<H>;
// 	getBalances: GetBalancesUseCase<H>;
// 	updateOrderbook: UpdateOrderbook<H>;
// 	updateTrades: UpdateTrades<H>;
// 	subscription: Subscription<H>;
// }

// export interface Facades<H extends HLike<H>> {
// 	instant: Instant<H>;
// 	latency: Latency<H>;
// 	joystick: Joystick<H>;
// }

export interface Snapshot<PricingSnapshot> {
	readonly assets: Assets.Snapshot;
	readonly margins: Margins.Snapshot;
	readonly makers: Makers.Snapshot;
	readonly book: Book.Snapshot;
	readonly pricing: PricingSnapshot;
	readonly progress: Progress.Snapshot;
}
