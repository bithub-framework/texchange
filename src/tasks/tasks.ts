import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';

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
import { GetBalances } from '../tasks.d/get-balances/get-balances';
import { GetClosable } from '../tasks.d/get-closable/get-closable';
import { GetPositions } from '../tasks.d/get-positions/get-positions';
import { OrderMakes } from '../tasks.d/order-makes/order-makes';
import { OrderTakes } from '../tasks.d/order-takes/order-takes';
import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers';
import { ValidateOrder } from '../tasks.d/validate-order/validate-order';
import { OrderVolumes } from '../tasks.d/order-volumes/order-volumes';
import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';

import { HLike } from 'interfaces';



export abstract class Tasks<H extends HLike<H>> {
	public readonly getBalances: GetBalancesLike<H>;
	public readonly getPositions: GetPositionsLike<H>;
	public abstract readonly getAvailable: GetAvailableLike<H>;
	public readonly getClosable: GetClosableLike<H>;
	public abstract readonly settle: SettleLike;
	public readonly orderMakes: OrderMakesLike<H>;
	public readonly tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
	public readonly orderTakes: OrderTakesLike<H>;
	public readonly validateOrder: ValidateOrderLike<H>;
	public readonly makeOpenOrder: MakeOpenOrderLike<H>;
	public readonly cancelOpenOrder: CancelOpenOrderLike<H>;
	public abstract readonly marginAccumulation: MarginAccumulationLike<H>;
	public readonly orderVolumes: OrderVolumesLike<H>;

	protected constructor(
		context: Context<H>,
		models: Models<H>,
		broadcast: Broadcast<H>,
	) {
		this.cancelOpenOrder = new CancelOpenOrder(context, models, broadcast, this);
		this.getBalances = new GetBalances(context, models, broadcast, this);
		this.getClosable = new GetClosable(context, models, broadcast, this);
		this.getPositions = new GetPositions(context, models, broadcast, this);
		this.makeOpenOrder = new MakeOpenOrder(context, models, broadcast, this);
		this.orderMakes = new OrderMakes(context, models, broadcast, this);
		this.orderTakes = new OrderTakes(context, models, broadcast, this);
		this.tradeTakesOpenMakers = new TradeTakesOpenMakers(context, models, broadcast, this);
		this.validateOrder = new ValidateOrder(context, models, broadcast, this);
		this.orderVolumes = new OrderVolumes(context, models, broadcast, this);
	}
}
