import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';

import { MakeOpenOrder } from '../tasks.d/make-open-order';
import { CancelOpenOrder } from '../tasks.d/cancel-open-order';
import { GetBalances } from '../tasks.d/get-balances';
import { GetClosable } from '../tasks.d/get-closable';
import { GetPositions } from '../tasks.d/get-positions';
import { OrderMakes } from '../tasks.d/order-makes';
import { OrderTakes } from '../tasks.d/order-takes';
import { TradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers';
import { ValidateOrder } from '../tasks.d/validate-order';
import { OrderVolumes } from '../tasks.d/order-volumes';

import {
	Balances,
	Closable,
	Positions,
	Length,
	HLike,
	TexchangeOpenOrder,
	TexchangeTrade,
} from 'interfaces';



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



export interface GetBalancesLike<H extends HLike<H>> {
	getBalances(): Balances<H>;
}

export interface GetPositionsLike<H extends HLike<H>> {
	getPositions(): Positions<H>;
}

export interface GetAvailableLike<H extends HLike<H>> {
	getAvailable(): H;
}

export interface GetClosableLike<H extends HLike<H>> {
	getClosable(): Closable<H>;
}

export interface SettleLike {
	settle(): void;
}

export interface OrderMakesLike<H extends HLike<H>> {
	orderMakes(openOrder: TexchangeOpenOrder<H>): void;
}

export interface OrderTakesLike<H extends HLike<H>> {
	orderTakes(taker: TexchangeOpenOrder<H>): TexchangeTrade<H>[];
}

export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
	tradeTakesOpenMakers(trade: TexchangeTrade<H>): void;
}

export interface MakeOpenOrderLike<H extends HLike<H>> {
	makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

export interface CancelOpenOrderLike<H extends HLike<H>> {
	cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

export interface ValidateOrderLike<H extends HLike<H>> {
	validateOrder(order: TexchangeOpenOrder<H>): void;
}

export interface MarginAccumulationLike<H extends HLike<H>> {
	newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
	newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}

export namespace MarginAccumulationLike {
	export interface Volumes<H extends HLike<H>> {
		length: Length;
		volume: H;
		dollarVolume: H;
	}
}

export interface OrderVolumesLike<H extends HLike<H>> {
	open(volumes: OrderVolumesLike.Volumes<H>): void;
	close(volumes: OrderVolumesLike.Volumes<H>): void;
}

export namespace OrderVolumesLike {
	export interface Volumes<H extends HLike<H>> {
		length: Length;
		volume: H;
		dollarVolume: H;
	}
}
