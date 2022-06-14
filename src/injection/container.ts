import { HLike, HStatic } from 'secretary-like';
import { BaseContainer } from '@zimtsui/injektor';
import { TYPES } from './types';

// Context
import { Context } from '../context';
import { Spec } from '../context.d/spec';
import { TimelineLike } from 'secretary-like';
import { DataStatic } from '../interfaces/data';
import { MarketCalc } from 'secretary-like';

// Models
import { Models } from '../texchange/models';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { Assets } from '../models.d/assets';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Margins } from '../models.d/margins';

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
import { TaskSettle } from '../tasks.d/settle/settle';


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
import { Instant } from '../facades.d/instant';
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';

// Texchange
import { Texchange } from '../texchange/texchange';
import { AdminTex } from '../texchange/texchange';
import { UserTex } from '../texchange/texchange';


export abstract class Container<H extends HLike<H>> extends BaseContainer {
	public abstract [TYPES.HStatic]: () => HStatic<H>;
	public abstract [TYPES.spec]: () => Spec<H>;
	public abstract [TYPES.TimelineLike]: () => TimelineLike;
	public abstract [TYPES.MarketCalc]: () => MarketCalc<H>;

	public [TYPES.DataStatic] = this.rcs<DataStatic<H>>(DataStatic);
	public [TYPES.Context] = this.rcs<Context<H>>(Context);

	public abstract [TYPES.MODELS.Makers]: () => Makers<H>;
	public abstract [TYPES.MODELS.Pricing]: () => Pricing<H, any>;
	public [TYPES.MODELS.Assets] = this.rcs<Assets<H>>(Assets);
	public [TYPES.MODELS.Margins] = this.rcs<Margins<H>>(Margins);
	public [TYPES.MODELS.Book] = this.rcs<Book<H>>(Book);
	public [TYPES.MODELS.Progress] = this.rcs<Progress<H>>(Progress);
	public [TYPES.Models] = this.rcs<Models<H>>(Models);

	public abstract [TYPES.Mtm]: () => Mtm<H> | null;

	public [TYPES.Broadcast] = this.rcs<Broadcast<H>>(Broadcast);

	public [TYPES.Tasks] = this.rcs<Tasks<H>>(Tasks);
	public [TYPES.TASKS.MakeOpenOrder] = this.rcs<TaskMakeOpenOrder<H>>(TaskMakeOpenOrder);
	public [TYPES.TASKS.CancelOpenOrder] = this.rcs<TaskCancelOpenOrder<H>>(TaskCancelOpenOrder);
	public [TYPES.TASKS.GetBalances] = this.rcs<TaskGetBalances<H>>(TaskGetBalances);
	public [TYPES.TASKS.GetClosable] = this.rcs<TaskGetClosable<H>>(TaskGetClosable);
	public [TYPES.TASKS.GetPositions] = this.rcs<TaskGetPositions<H>>(TaskGetPositions);
	public [TYPES.TASKS.OrderMakes] = this.rcs<TaskOrderMakes<H>>(TaskOrderMakes);
	public [TYPES.TASKS.OrderTakes] = this.rcs<TaskOrderTakes<H>>(TaskOrderTakes);
	public [TYPES.TASKS.TradeTakesOpenMakers] = this.rcs<TaskTradeTakesOpenMakers<H>>(TaskTradeTakesOpenMakers);
	public [TYPES.TASKS.ValidateOrder] = this.rcs<TaskValidateOrder<H>>(TaskValidateOrder);
	public [TYPES.TASKS.OrderVolumes] = this.rcs<TaskOrderVolumes<H>>(TaskOrderVolumes);
	public abstract [TYPES.TASKS.GetAvailable]: () => TaskGetAvailable<H>;
	public abstract [TYPES.TASKS.MarginAccumulation]: () => TaskMarginAccumulation<H>;
	public abstract [TYPES.TASKS.Settle]: () => TaskSettle<H>;


	public [TYPES.UseCases] = this.rcs<UseCases<H>>(UseCases);
	public [TYPES.USE_CASES.MakeOrder] = this.rcs<UseCaseMakeOrder<H>>(UseCaseMakeOrder);
	public [TYPES.USE_CASES.CancelOrder] = this.rcs<UseCaseCancelOrder<H>>(UseCaseCancelOrder);
	public [TYPES.USE_CASES.AmendOrder] = this.rcs<UseCaseAmendOrder<H>>(UseCaseAmendOrder);
	public [TYPES.USE_CASES.GetOpenOrders] = this.rcs<UseCaseGetOpenOrders<H>>(UseCaseGetOpenOrders);
	public [TYPES.USE_CASES.GetPositions] = this.rcs<UseCaseGetPositions<H>>(UseCaseGetPositions);
	public [TYPES.USE_CASES.GetBalances] = this.rcs<UseCaseGetBalances<H>>(UseCaseGetBalances);
	public [TYPES.USE_CASES.UpdateOrderbook] = this.rcs<UseCaseUpdateOrderbook<H>>(UseCaseUpdateOrderbook);
	public [TYPES.USE_CASES.UpdateTrades] = this.rcs<UseCaseUpdateTrades<H>>(UseCaseUpdateTrades);
	public abstract [TYPES.USE_CASES.realTimeSettlement]: () => boolean;
	public [TYPES.USE_CASES.Subscription] = this.rcs<UseCaseSubscription<H>>(UseCaseSubscription);
	public [TYPES.USE_CASES.GetProgress] = this.rcs<UseCaseGetProgress<H>>(UseCaseGetProgress);



	public [TYPES.Facades] = this.rcs<Facades<H>>(Facades);
	public [TYPES.Instant] = this.rcs<Instant<H>>(Instant);
	public [TYPES.Latency] = this.rcs<Latency<H>>(Latency);
	public [TYPES.Joystick] = this.rcs<Joystick<H>>(Joystick);

	public [TYPES.UserTex] = this.rfs<UserTex<H>>(() => this[TYPES.Facades]().latency);
	public [TYPES.AdminTex] = this.rfs<AdminTex<H>>(() => this[TYPES.Facades]().joystick);
	public [TYPES.Texchange] = this.rcs<Texchange<H>>(Texchange);
}
