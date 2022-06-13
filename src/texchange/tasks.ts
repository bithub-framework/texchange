import { Context } from '../context';
import { Models } from './models';
import { Broadcast } from '../broadcast';

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

// import { MakeOpenOrder } from '../tasks.d/make-open-order/make-open-order';
// import { CancelOpenOrder } from '../tasks.d/cancel-open-order/cancel-open-order';
// import { GetBalances } from '../tasks.d/get-balances/get-balances';
// import { GetClosable } from '../tasks.d/get-closable/get-closable';
// import { GetPositions } from '../tasks.d/get-positions/get-positions';
// import { OrderMakes } from '../tasks.d/order-makes/order-makes';
// import { OrderTakes } from '../tasks.d/order-takes/order-takes';
// import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers';
// import { ValidateOrder } from '../tasks.d/validate-order/validate-order';
// import { OrderVolumes } from '../tasks.d/order-volumes/order-volumes';
// import { GetAvailable } from '../tasks.d/get-available/get-available';
// import { MarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';
// import { Settle } from '../tasks.d/settle/settle';

import { HLike } from 'secretary-like';

import { TYPES } from '../injection/types';
import { instantInject } from '@zimtsui/injektor';


export class Tasks<H extends HLike<H>>  {
	@instantInject(TYPES.TASKS.GetBalances)
	public getBalances!: GetBalancesLike<H>;
	@instantInject(TYPES.TASKS.GetPositions)
	public getPositions!: GetPositionsLike<H>;
	@instantInject(TYPES.TASKS.GetAvailable)
	public getAvailable!: GetAvailableLike<H>;
	@instantInject(TYPES.TASKS.GetClosable)
	public getClosable!: GetClosableLike<H>;
	@instantInject(TYPES.TASKS.Settle)
	public settle!: SettleLike;
	@instantInject(TYPES.TASKS.OrderMakes)
	public orderMakes!: OrderMakesLike<H>;
	@instantInject(TYPES.TASKS.TradeTakesOpenMakers)
	public tradeTakesOpenMakers!: TradeTakesOpenMakersLike<H>;
	@instantInject(TYPES.TASKS.OrderTakes)
	public orderTakes!: OrderTakesLike<H>;
	@instantInject(TYPES.TASKS.ValidateOrder)
	public validateOrder!: ValidateOrderLike<H>;
	@instantInject(TYPES.TASKS.MakeOpenOrder)
	public makeOpenOrder!: MakeOpenOrderLike<H>;
	@instantInject(TYPES.TASKS.CancelOpenOrder)
	public cancelOpenOrder!: CancelOpenOrderLike<H>;
	@instantInject(TYPES.TASKS.MarginAccumulation)
	public marginAccumulation!: MarginAccumulationLike<H>;
	@instantInject(TYPES.TASKS.OrderVolumes)
	public orderVolumes!: OrderVolumesLike<H>;

	public constructor(
	) {
		// this.getBalances = new GetBalances(context, models, broadcast, this);
		// this.getPositions = new GetPositions(context, models, broadcast, this);
		// this.getClosable = new GetClosable(context, models, broadcast, this);
		// this.orderMakes = new OrderMakes(context, models, broadcast, this);
		// this.tradeTakesOpenMakers = new TradeTakesOpenMakers(context, models, broadcast, this);
		// this.orderTakes = new OrderTakes(context, models, broadcast, this);
		// this.validateOrder = new ValidateOrder(context, models, broadcast, this);
		// this.makeOpenOrder = new MakeOpenOrder(context, models, broadcast, this);
		// this.cancelOpenOrder = new CancelOpenOrder(context, models, broadcast, this);
		// this.orderVolumes = new OrderVolumes(context, models, broadcast, this);
	}
}
