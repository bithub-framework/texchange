import Big from 'big.js';
import {
	OpenOrder,
	Balances,
	Closable,
	Positions,
	Trade,
} from 'interfaces';


export interface GetBalancesLike {
	getBalances(): Balances;
}

export interface GetPositionsLike {
	getPositions(): Positions;
}

export interface GetAvailableLike {
	getAvailable(): Big;
}

export interface GetClosableLike {
	getClosable(): Closable;
}

export interface SettleLike {
	settle(): void;
}

export interface OrderMakesLike {
	orderMakes(openOrder: Readonly<OpenOrder>): void;
}

export interface OrderTakesLike {
	orderTakes(taker: OpenOrder): Trade[];
}

export interface TradeTakesOpenMakersLike {
	tradeTakesOpenMakers(trade: Readonly<Trade>): void;
}

export interface MakeOpenOrderLike {
	makeOpenOrder(order: OpenOrder): OpenOrder;
}

export interface CancelOpenOrderLike {
	cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}

export interface ValidateOrderLike {
	validateOrder(order: Readonly<OpenOrder>): void;
}

export interface TasksLike {
	readonly getBalances: GetBalancesLike;
	readonly getPositions: GetPositionsLike;
	readonly getAvailable: GetAvailableLike;
	readonly getClosable: GetClosableLike;
	readonly settle: SettleLike;
	readonly orderMakes: OrderMakesLike;
	readonly tradeTakesOpenMakers: TradeTakesOpenMakersLike;
	readonly orderTakes: OrderTakesLike;
	readonly validateOrder: ValidateOrderLike;
	readonly makeOpenOrder: MakeOpenOrderLike;
	readonly cancelOpenOrder: CancelOpenOrderLike;
}
