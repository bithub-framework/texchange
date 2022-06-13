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
// import { Makers } from '../models.d/makers/makers';
// import { Pricing } from '../models.d/pricing/pricing';
// import { Assets } from '../models.d/assets';
// import { Book } from '../models.d/book';
// import { Progress } from '../models.d/progress';
// import { Margins } from '../models.d/margins';
import * as MODELS from '../models.d';

// Broadcast
import { Broadcast } from '../broadcast';

// Mtm
import { Mtm } from '../mark-to-market/mtm';

// Tasks
import { Tasks } from '../texchange/tasks';
import { UpdateTrades } from '../use-cases.d/update-trades';
import * as TASKS from '../tasks.d';

// UseCases
import { UseCases } from '../texchange/use-cases';
import * as USE_CASES from '../use-cases.d';

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

	public abstract [TYPES.MODELS.Makers]: () => MODELS.Makers<H>;
	public abstract [TYPES.MODELS.Pricing]: () => MODELS.Pricing<H, any>;
	public [TYPES.MODELS.Assets] = this.rcs<MODELS.Assets<H>>(MODELS.Assets);
	public [TYPES.MODELS.Margins] = this.rcs<MODELS.Margins<H>>(MODELS.Margins);
	public [TYPES.MODELS.Book] = this.rcs<MODELS.Book<H>>(MODELS.Book);
	public [TYPES.MODELS.Progress] = this.rcs<MODELS.Progress<H>>(MODELS.Progress);
	public [TYPES.Models] = this.rcs<Models<H>>(Models);

	public abstract [TYPES.Mtm]: () => Mtm<H> | null;

	public [TYPES.Broadcast] = this.rcs<Broadcast<H>>(Broadcast);

	public [TYPES.Tasks] = this.rcs<Tasks<H>>(Tasks);
	public [TYPES.TASKS.MakeOpenOrder] = this.rcs<TASKS.MakeOpenOrderLike<H>>(TASKS.MakeOpenOrder);
	public [TYPES.TASKS.CancelOpenOrder] = this.rcs<TASKS.CancelOpenOrderLike<H>>(TASKS.CancelOpenOrder);
	public [TYPES.TASKS.GetBalances] = this.rcs<TASKS.GetBalancesLike<H>>(TASKS.GetBalances);
	public [TYPES.TASKS.GetClosable] = this.rcs<TASKS.GetClosableLike<H>>(TASKS.GetClosable);
	public [TYPES.TASKS.GetPositions] = this.rcs<TASKS.GetPositionsLike<H>>(TASKS.GetPositions);
	public [TYPES.TASKS.OrderMakes] = this.rcs<TASKS.OrderMakesLike<H>>(TASKS.OrderMakes);
	public [TYPES.TASKS.OrderTakes] = this.rcs<TASKS.OrderTakesLike<H>>(TASKS.OrderTakes);
	public [TYPES.TASKS.TradeTakesOpenMakers] = this.rcs<TASKS.TradeTakesOpenMakersLike<H>>(TASKS.TradeTakesOpenMakers);
	public [TYPES.TASKS.ValidateOrder] = this.rcs<TASKS.ValidateOrderLike<H>>(TASKS.ValidateOrder);
	public [TYPES.TASKS.OrderVolumes] = this.rcs<TASKS.OrderVolumesLike<H>>(TASKS.OrderVolumes);
	public abstract [TYPES.TASKS.GetAvailable]: () => TASKS.GetAvailableLike<H>;
	public abstract [TYPES.TASKS.MarginAccumulation]: () => TASKS.MarginAccumulationLike<H>;
	public abstract [TYPES.TASKS.Settle]: () => TASKS.SettleLike;


	public [TYPES.UseCases] = this.rcs<UseCases<H>>(UseCases);
	public [TYPES.USE_CASES.MakeOrder] = this.rcs<USE_CASES.MakeOrder<H>>(USE_CASES.MakeOrder);
	public [TYPES.USE_CASES.CancelOrder] = this.rcs<USE_CASES.CancelOrder<H>>(USE_CASES.CancelOrder);
	public [TYPES.USE_CASES.AmendOrder] = this.rcs<USE_CASES.AmendOrder<H>>(USE_CASES.AmendOrder);
	public [TYPES.USE_CASES.GetOpenOrders] = this.rcs<USE_CASES.GetOpenOrders<H>>(USE_CASES.GetOpenOrders);
	public [TYPES.USE_CASES.GetPositions] = this.rcs<USE_CASES.GetPositions<H>>(USE_CASES.GetPositions);
	public [TYPES.USE_CASES.GetBalances] = this.rcs<USE_CASES.GetBalances<H>>(USE_CASES.GetBalances);
	public [TYPES.USE_CASES.UpdateOrderbook] = this.rcs<USE_CASES.UpdateOrderbook<H>>(USE_CASES.UpdateOrderbook);
	public [TYPES.USE_CASES.UpdateTrades] = this.rcs<USE_CASES.UpdateTrades<H>>(USE_CASES.UpdateTrades);
	public abstract [TYPES.USE_CASES.realTimeSettlement]: () => boolean;
	public [TYPES.USE_CASES.Subscription] = this.rcs<USE_CASES.Subscription<H>>(USE_CASES.Subscription);
	public [TYPES.USE_CASES.GetProgress] = this.rcs<USE_CASES.GetProgress<H>>(USE_CASES.GetProgress);



	public [TYPES.Facades] = this.rcs<Facades<H>>(Facades);
	public [TYPES.Instant] = this.rcs<Instant<H>>(Instant);
	public [TYPES.Latency] = this.rcs<Latency<H>>(Latency);
	public [TYPES.Joystick] = this.rcs<Joystick<H>>(Joystick);

	public [TYPES.UserTex] = this.rfs<UserTex<H>>(() => this[TYPES.Facades]().latency);
	public [TYPES.AdminTex] = this.rfs<AdminTex<H>>(() => this[TYPES.Facades]().joystick);
	public [TYPES.Texchange] = this.rcs<Texchange<H>>(Texchange);
}
