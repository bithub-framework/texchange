import Big from 'big.js';
import {
	OpenOrder,
	Balances,
	Closable,
	Positions,
	Trade,
	Length,
	HLike,
	ConcreteOrderId,
	ConcreteOpenOrder,
	ConcreteTrade,
} from 'interfaces';


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
	orderMakes(openOrder: ConcreteOpenOrder<H>): void;
}

export interface OrderTakesLike<H extends HLike<H>> {
	orderTakes(taker: ConcreteOpenOrder<H>): ConcreteTrade<H>[];
}

export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
	tradeTakesOpenMakers(trade: ConcreteTrade<H>): void;
}

export interface MakeOpenOrderLike<H extends HLike<H>> {
	makeOpenOrder(order: ConcreteOpenOrder<H>): ConcreteOpenOrder<H>;
}

export interface CancelOpenOrderLike<H extends HLike<H>> {
	cancelOpenOrder(order: ConcreteOpenOrder<H>): ConcreteOpenOrder<H>;
}

export interface ValidateOrderLike<H extends HLike<H>> {
	validateOrder(order: ConcreteOpenOrder<H>): void;
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

export interface TasksLike<H extends HLike<H>> {
	readonly getBalances: GetBalancesLike<H>;
	readonly getPositions: GetPositionsLike<H>;
	readonly getAvailable: GetAvailableLike<H>;
	readonly getClosable: GetClosableLike<H>;
	readonly settle: SettleLike;
	readonly orderMakes: OrderMakesLike<H>;
	readonly tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
	readonly orderTakes: OrderTakesLike<H>;
	readonly validateOrder: ValidateOrderLike<H>;
	readonly makeOpenOrder: MakeOpenOrderLike<H>;
	readonly cancelOpenOrder: CancelOpenOrderLike<H>;
	readonly marginAccumulation: MarginAccumulationLike<H>;
	readonly orderVolumes: OrderVolumesLike<H>;
}
