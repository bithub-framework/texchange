import {
	HLike, HStatic,
	MarketSpec,
	AccountSpec,
} from 'secretary-like';
import { BaseContainer } from '@zimtsui/injektor';
import { TYPES } from './types';

// Context
import { Context } from '../context';
import { TimelineLike } from 'secretary-like';
import { DataStatic } from '../interfaces/data';

// Models
import { Models } from '../texchange/models';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { Assets } from '../models.d/margin-assets/assets';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets/margin-assets';

// Broadcast
import { Broadcast } from '../broadcast';

// Mtm
import { Mtm } from '../mark-to-market/mtm';

// Tasks
import { Tasks } from '../texchange/tasks';
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
import { TaskMarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';
import { Clearinghouse } from '../tasks.d/settle/settle';


// UseCases
import { UseCases } from '../texchange/use-cases';
import { UseCaseMakeOrder } from '../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../use-cases.d/amend-order';
import { UseCaseGetOpenOrders } from '../use-cases.d/get-open-orders';
import { UseCaseGetPositions } from '../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../use-cases.d/get-balances';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseSubscription } from '../use-cases.d/subscription';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';


// Facades
import { Facades } from '../texchange/facades';
import { Config as DelayConfig } from '../facades.d/config';
import { Instant } from '../facades.d/user-account/instant';
import { AdminFacade } from '../facades.d/admin';
import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';

// Texchange
import { Texchange } from '../texchange/texchange';


export abstract class Container<H extends HLike<H>> extends BaseContainer {
	public abstract [TYPES.hStatic]: () => HStatic<H>;
	public abstract [TYPES.marketSpec]: () => MarketSpec<H>;
	public abstract [TYPES.accountSpec]: () => AccountSpec;
	public abstract [TYPES.timeline]: () => TimelineLike;

	public [TYPES.dataStatic] = this.rcs<DataStatic<H>>(DataStatic);
	public [TYPES.context] = this.rcs<Context<H>>(Context);

	public abstract [TYPES.MODELS.makers]: () => Makers<H>;
	public abstract [TYPES.MODELS.pricing]: () => Pricing<H, any>;
	public [TYPES.MODELS.assets] = this.rcs<Assets<H>>(Assets);
	public [TYPES.MODELS.margins] = this.rcs<MarginAssets<H>>(MarginAssets);
	public [TYPES.MODELS.book] = this.rcs<Book<H>>(Book);
	public [TYPES.MODELS.progress] = this.rcs<Progress<H>>(Progress);
	public [TYPES.models] = this.rcs<Models<H>>(Models);

	public abstract [TYPES.mtm]: () => Mtm<H> | null;

	public [TYPES.broadcast] = this.rcs<Broadcast<H>>(Broadcast);

	public [TYPES.tasks] = this.rcs<Tasks<H>>(Tasks);
	public [TYPES.TASKS.makeOpenOrder] = this.rcs<TaskMakeOpenOrder<H>>(TaskMakeOpenOrder);
	public [TYPES.TASKS.cancelOpenOrder] = this.rcs<TaskCancelOpenOrder<H>>(TaskCancelOpenOrder);
	public [TYPES.TASKS.getBalances] = this.rcs<TaskGetBalances<H>>(TaskGetBalances);
	public [TYPES.TASKS.getClosable] = this.rcs<TaskGetClosable<H>>(TaskGetClosable);
	public [TYPES.TASKS.getPositions] = this.rcs<TaskGetPositions<H>>(TaskGetPositions);
	public [TYPES.TASKS.orderMakes] = this.rcs<TaskOrderMakes<H>>(TaskOrderMakes);
	public [TYPES.TASKS.orderTakes] = this.rcs<TaskOrderTakes<H>>(TaskOrderTakes);
	public [TYPES.TASKS.tradeTakesOpenMakers] = this.rcs<TaskTradeTakesOpenMakers<H>>(TaskTradeTakesOpenMakers);
	public [TYPES.TASKS.validateOrder] = this.rcs<TaskValidateOrder<H>>(TaskValidateOrder);
	public [TYPES.TASKS.orderVolumes] = this.rcs<TaskOrderVolumes<H>>(TaskOrderVolumes);
	public abstract [TYPES.TASKS.getAvailable]: () => TaskGetAvailable<H>;
	public abstract [TYPES.TASKS.marginAccumulation]: () => TaskMarginAccumulation<H>;
	public abstract [TYPES.TASKS.settle]: () => Clearinghouse<H>;


	public [TYPES.useCases] = this.rcs<UseCases<H>>(UseCases);
	public [TYPES.USE_CASES.makeOrder] = this.rcs<UseCaseMakeOrder<H>>(UseCaseMakeOrder);
	public [TYPES.USE_CASES.cancelOrder] = this.rcs<UseCaseCancelOrder<H>>(UseCaseCancelOrder);
	public [TYPES.USE_CASES.amendOrder] = this.rcs<UseCaseAmendOrder<H>>(UseCaseAmendOrder);
	public [TYPES.USE_CASES.getOpenOrders] = this.rcs<UseCaseGetOpenOrders<H>>(UseCaseGetOpenOrders);
	public [TYPES.USE_CASES.getPositions] = this.rcs<UseCaseGetPositions<H>>(UseCaseGetPositions);
	public [TYPES.USE_CASES.getBalances] = this.rcs<UseCaseGetBalances<H>>(UseCaseGetBalances);
	public [TYPES.USE_CASES.updateOrderbook] = this.rcs<UseCaseUpdateOrderbook<H>>(UseCaseUpdateOrderbook);
	public [TYPES.USE_CASES.updateTrades] = this.rcs<UseCaseUpdateTrades<H>>(UseCaseUpdateTrades);
	public abstract [TYPES.USE_CASES.realTimeSettlement]: () => boolean;
	public [TYPES.USE_CASES.subscription] = this.rcs<UseCaseSubscription<H>>(UseCaseSubscription);
	public [TYPES.USE_CASES.getProgress] = this.rcs<UseCaseGetProgress<H>>(UseCaseGetProgress);


	public [TYPES.facades] = this.rcs<Facades<H>>(Facades);
	public abstract [TYPES.FACADES.config]: () => DelayConfig;
	public [TYPES.FACADES.instant] = this.rcs<Instant<H>>(Instant);
	public [TYPES.FACADES.userMarket] = this.rcs<UserMarketFacade<H>>(UserMarketFacade);
	public [TYPES.FACADES.userAccount] = this.rcs<UserAccountFacade<H>>(UserAccountFacade);
	public [TYPES.FACADES.admin] = this.rcs<AdminFacade<H>>(AdminFacade);

	public [TYPES.texchange] = this.rcs<Texchange<H>>(Texchange);
}
