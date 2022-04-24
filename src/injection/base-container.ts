import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { TYPES } from '../types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';

// Models
import { Models } from '../models';

// Broadcast
import { Broadcast } from '../broadcast';

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

import { Tasks } from '../tasks/tasks';

// UseCases
import { UseCases } from '../use-cases';

// Facades
import { Facades } from '../facades';

// Controller
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';

// Texchange
import { Texchange } from '../texchange';


export function createBaseContainer<
	H extends HLike<H>,
	PricingSnapshot,
	>(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
): Container {
	const c = new Container();

	c.rfs<Context<H>>(
		Context,
		() => new Context(
			c.i(TYPES.MarketCalc),
			config,
			timeline,
			H,
		),
	);

	c.rcs<Models<H, PricingSnapshot>>(
		Models,
		Models,
	);

	c.rc<Broadcast<H>>(
		Broadcast,
		Broadcast,
	);

	c.ra(MakeOpenOrder.TaskDeps, Tasks);
	c.ra(CancelOpenOrder.TaskDeps, Tasks);
	c.ra(GetBalancesTask.TaskDeps, Tasks);
	c.ra(GetClosable.TaskDeps, Tasks);
	c.ra(GetPositionsTask.TaskDeps, Tasks);
	c.ra(OrderMakes.TaskDeps, Tasks);
	c.ra(OrderTakes.TaskDeps, Tasks);
	c.ra(TradeTakesOpenMakers.TaskDeps, Tasks);
	c.ra(ValidateOrder.TaskDeps, Tasks);
	c.ra(OrderVolumes.TaskDeps, Tasks);

	c.rcs<MakeOpenOrderLike<H>>(TYPES.MakeOpenOrderLike, MakeOpenOrder);
	c.rcs<CancelOpenOrderLike<H>>(TYPES.CancelOpenOrderLike, CancelOpenOrder);
	c.rcs<GetBalancesLike<H>>(TYPES.GetBalancesLike, GetBalancesTask);
	c.rcs<GetClosableLike<H>>(TYPES.GetClosableLike, GetClosable);
	c.rcs<GetPositionsLike<H>>(TYPES.GetPositionsLike, GetPositionsTask);
	c.rcs<OrderMakesLike<H>>(TYPES.OrderMakesLike, OrderMakes);
	c.rcs<OrderTakesLike<H>>(TYPES.OrderTakesLike, OrderTakes);
	c.rcs<TradeTakesOpenMakersLike<H>>(TYPES.TradeTakesOpenMakersLike, TradeTakesOpenMakers);
	c.rcs<ValidateOrderLike<H>>(TYPES.ValidateOrderLike, ValidateOrder);
	c.rcs<OrderVolumes<H>>(TYPES.OrderVolumesLike, OrderVolumes);

	c.rcs<UseCases<H>>(
		UseCases,
		UseCases,
	);

	c.rcs<Facades<H>>(
		Facades,
		Facades,
	);

	c.rfs<Latency<H>>(
		TYPES.User,
		() => c.i<Facades<H>>(Facades).latency,
	);
	c.rfs<Joystick<H>>(
		TYPES.Admin,
		() => c.i<Facades<H>>(Facades).joystick,
	);

	c.rcs<Texchange<H, PricingSnapshot>>(
		Texchange,
		Texchange,
	);

	return c;
}
