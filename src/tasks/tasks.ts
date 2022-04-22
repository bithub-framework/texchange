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
import { GetBalances } from '../tasks.d/get-balances/get-balances';
import { GetClosable } from '../tasks.d/get-closable/get-closable';
import { GetPositions } from '../tasks.d/get-positions/get-positions';
import { OrderMakes } from '../tasks.d/order-makes/order-makes';
import { OrderTakes } from '../tasks.d/order-takes/order-takes';
import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers';
import { ValidateOrder } from '../tasks.d/validate-order/validate-order';
import { OrderVolumes } from '../tasks.d/order-volumes/order-volumes';
import { GetAvailable } from '../tasks.d/get-available/get-available';
import { MarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';
import { Settle } from '../tasks.d/settle/settle';

import { HLike } from 'interfaces';
import { instantInject } from 'injektor';
import { TYPES } from '../types';


export abstract class Tasks<H extends HLike<H>> implements
	MakeOpenOrder.TaskDeps<H>,
	CancelOpenOrder.TaskDeps<H>,
	GetBalances.TaskDeps<H>,
	GetClosable.TaskDeps<H>,
	GetPositions.TaskDeps<H>,
	OrderMakes.TaskDeps<H>,
	OrderTakes.TaskDeps<H>,
	TradeTakesOpenMakers.TaskDeps<H>,
	ValidateOrder.TaskDeps<H>,
	OrderVolumes.TaskDeps<H>,
	GetAvailable.TaskDeps<H>,
	Settle.TaskDeps<H>,
	MarginAccumulation.TaskDeps<H> {

	@instantInject(TYPES.GetBalancesLike)
	public getBalances!: GetBalancesLike<H>;
	@instantInject(TYPES.GetPositionsLike)
	public getPositions!: GetPositionsLike<H>;
	@instantInject(TYPES.GetAvailableLike)
	public getAvailable!: GetAvailableLike<H>;
	@instantInject(TYPES.GetClosableLike)
	public getClosable!: GetClosableLike<H>;
	@instantInject(TYPES.SettleLike)
	public settle!: SettleLike;
	@instantInject(TYPES.OrderMakesLike)
	public orderMakes!: OrderMakesLike<H>;
	@instantInject(TYPES.TradeTakesOpenMakersLike)
	public tradeTakesOpenMakers!: TradeTakesOpenMakersLike<H>;
	@instantInject(TYPES.OrderTakesLike)
	public orderTakes!: OrderTakesLike<H>;
	@instantInject(TYPES.ValidateOrderLike)
	public validateOrder!: ValidateOrderLike<H>;
	@instantInject(TYPES.MakeOpenOrderLike)
	public makeOpenOrder!: MakeOpenOrderLike<H>;
	@instantInject(TYPES.CancelOpenOrderLike)
	public cancelOpenOrder!: CancelOpenOrderLike<H>;
	@instantInject(TYPES.MarginAccumulationLike)
	public marginAccumulation!: MarginAccumulationLike<H>;
	@instantInject(TYPES.OrderVolumesLike)
	public orderVolumes!: OrderVolumesLike<H>;
}
