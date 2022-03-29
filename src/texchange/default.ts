import { TexchangeLike, Snapshot } from './texchange-like';
import { HLike } from 'interfaces';
import { Startable } from 'startable';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import {
	HStatic,
	Timeline,
} from 'interfaces';
import { DefaultMarketCalc } from '../context.d/market-calc/default';

// Models
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';

import { DefaultMakers } from '../models.d/makers/default';
import { DefaultPricing } from '../models.d/pricing/default';

// Broadcast
import { Broadcast } from '../broadcast';
import { EventEmitter } from 'events';

// Tasks
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';
import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';
import { GetClosableLike } from '../tasks.d/get-closable/get-closable-like';
import { GetPositionsLike } from '../tasks.d/get-positions/get-positions-like';
import { OrderMakesLike } from '../tasks.d/order-makes/order-makes-like';
import { OrderTakesLike } from '../tasks.d/order-takes/order-takes-like';
import { TradeTakesOpenMakersLike } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers-like';
import { ValidateOrderLike } from '../tasks.d/validate-order/validate-order-like';
import { OrderVolumesLike } from '../tasks.d/order-volumes/order-volumes-like';
import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';

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

import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultSettle } from '../tasks.d/settle/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';

import { Container } from 'injektor';

// Mark to market
import { Mtm } from '../mark-to-market/mtm';
import { DefaultMtm } from '../mark-to-market/default';

// Use cases
import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions as GetPositionsUseCase } from '../use-cases.d/get-positions';
import { GetBalances as GetBalancesUseCase } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { Subscription } from '../use-cases.d/subscription';

// Views
import { Instant } from '../views.d/instant';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';


export class DefaultTexchange<H extends HLike<H>>
	implements TexchangeLike<H> {

	private context: Context<H>;
	private models: Models<H>;
	private broadcast: Broadcast<H>;
	private tasks: Tasks<H>;
	private mtm: Mtm<H> | null;
	private useCases: UseCases<H>;
	private views: Views<H>;
	public user: Latency<H>;
	public admin: Joystick<H>;
	public startable: Startable;

	public constructor(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
	) {
		this.context = this.assembleContext(config, timeline, H);
		this.models = this.assembleModels();
		this.broadcast = <Broadcast<H>>new EventEmitter();;
		this.tasks = this.assembleTasks();
		this.mtm = new DefaultMtm(this.context, this.models, this.broadcast, this.tasks);
		this.useCases = this.assembleUseCases();
		this.views = this.assembleViews();
		this.user = this.views.latency;
		this.admin = this.views.joystick;
		this.startable = new Startable(
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

	private assembleContext(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
	): Context<H> {
		return {
			config,
			timeline,
			H,
			calc: new DefaultMarketCalc(),
		};
	}

	private assembleModels(): Models<H> {
		return {
			assets: new Assets(this.context),
			margins: new Margins(this.context),
			book: new Book(this.context),
			progress: new Progress(this.context),
			makers: new DefaultMakers(this.context),
			pricing: new DefaultPricing(this.context),
		};
	}

	private assembleTasks(): Tasks<H> {
		const container = new Container();
		const tasks = {
			cancelOpenOrder: new CancelOpenOrder(this.context, this.models, this.broadcast),
			getBalances: new GetBalancesTask(this.context, this.models, this.broadcast),
			getClosable: new GetClosable(this.context, this.models, this.broadcast),
			getPositions: new GetPositionsTask(this.context, this.models, this.broadcast),
			makeOpenOrder: new MakeOpenOrder(this.context, this.models, this.broadcast),
			orderMakes: new OrderMakes(this.context, this.models, this.broadcast),
			orderTakes: new OrderTakes(this.context, this.models, this.broadcast),
			tradeTakesOpenMakers: new TradeTakesOpenMakers(this.context, this.models, this.broadcast),
			validateOrder: new ValidateOrder(this.context, this.models, this.broadcast),
			orderVolumes: new OrderVolumes(this.context, this.models, this.broadcast),
			getAvailable: new DefaultGetAvailable(this.context, this.models, this.broadcast),
			settle: new DefaultSettle(this.context, this.models, this.broadcast),
			marginAccumulation: new DefaultMarginAccumulation(this.context, this.models, this.broadcast),
		};
		container.register(CancelOpenOrder.TaskDeps, () => tasks);
		container.register(DefaultGetAvailable.TaskDeps, () => tasks);
		container.register(GetBalancesTask.TaskDeps, () => tasks);
		container.register(GetClosable.TaskDeps, () => tasks);
		container.register(GetPositionsTask.TaskDeps, () => tasks);
		container.register(MakeOpenOrder.TaskDeps, () => tasks);
		container.register(DefaultMarginAccumulation.TaskDeps, () => tasks);
		container.register(OrderMakes.TaskDeps, () => tasks);
		container.register(OrderTakes.TaskDeps, () => tasks);
		container.register(OrderVolumes.TaskDeps, () => tasks);
		container.register(DefaultSettle.TaskDeps, () => tasks);
		container.register(TradeTakesOpenMakers.TaskDeps, () => tasks);
		container.register(ValidateOrder.TaskDeps, () => tasks);
		container.inject(tasks.cancelOpenOrder);
		container.inject(tasks.getAvailable);
		container.inject(tasks.getBalances);
		container.inject(tasks.getClosable);
		container.inject(tasks.getPositions);
		container.inject(tasks.makeOpenOrder);
		container.inject(tasks.marginAccumulation);
		container.inject(tasks.orderMakes);
		container.inject(tasks.orderTakes);
		container.inject(tasks.orderVolumes);
		container.inject(tasks.settle);
		container.inject(tasks.tradeTakesOpenMakers);
		container.inject(tasks.validateOrder);

		return tasks;
	}

	private assembleUseCases(): UseCases<H> {
		return {
			amendOrder: new AmendOrder(this.context, this.models, this.broadcast, this.tasks),
			cancelOrder: new CancelOrder(this.context, this.models, this.broadcast, this.tasks),
			getBalances: new GetBalancesUseCase(this.context, this.models, this.broadcast, this.tasks),
			getOpenOrders: new GetOpenOrders(this.context, this.models, this.broadcast, this.tasks),
			getPositions: new GetPositionsUseCase(this.context, this.models, this.broadcast, this.tasks),
			makeOrder: new MakeOrder(this.context, this.models, this.broadcast, this.tasks),
			updateOrderbook: new UpdateOrderbook(this.context, this.models, this.broadcast, this.tasks),
			subscription: new Subscription(this.context, this.models, this.broadcast, this.tasks),
			updateTrades: new UpdateTrades(this.context, this.models, this.broadcast, this.tasks, true),

		};
	}

	private assembleViews(): Views<H> {
		const instant = new Instant(this.context, this.useCases);
		const latency = new Latency(this.context, this.useCases, instant);
		const joystick = new Joystick(this.context, this.useCases);
		return {
			instant,
			latency,
			joystick,
		};
	}

	public capture(): Snapshot {
		return {
			assets: this.models.assets.capture(),
			margins: this.models.margins.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	public restore(snapshot: Snapshot): void {
		this.models.assets.restore(snapshot.assets);
		this.models.margins.restore(snapshot.margins);
		this.models.makers.restore(snapshot.makers);
		this.models.book.restore(snapshot.book);
		this.models.pricing.restore(snapshot.pricing);
		this.models.progress.restore(snapshot.progress);
	}
}

export interface Models<H extends HLike<H>> {
	assets: Assets<H>;
	margins: Margins<H>;
	makers: Makers<H>;
	book: Book<H>;
	progress: Progress<H>;
	pricing: Pricing<H, any>;
}

export interface Tasks<H extends HLike<H>> {
	getBalances: GetBalancesLike<H>;
	getPositions: GetPositionsLike<H>;
	getAvailable: GetAvailableLike<H>;
	getClosable: GetClosableLike<H>;
	settle: SettleLike;
	orderMakes: OrderMakesLike<H>;
	tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
	orderTakes: OrderTakesLike<H>;
	validateOrder: ValidateOrderLike<H>;
	makeOpenOrder: MakeOpenOrderLike<H>;
	cancelOpenOrder: CancelOpenOrderLike<H>;
	marginAccumulation: MarginAccumulationLike<H>;
	orderVolumes: OrderVolumesLike<H>;
}

export interface UseCases<H extends HLike<H>> {
	makeOrder: MakeOrder<H>;
	cancelOrder: CancelOrder<H>;
	amendOrder: AmendOrder<H>;
	getOpenOrders: GetOpenOrders<H>;
	getPositions: GetPositionsUseCase<H>;
	getBalances: GetBalancesUseCase<H>;
	updateOrderbook: UpdateOrderbook<H>;
	updateTrades: UpdateTrades<H>;
	subscription: Subscription<H>;
}

export interface Views<H extends HLike<H>> {
	instant: Instant<H>;
	latency: Latency<H>;
	joystick: Joystick<H>;
}
