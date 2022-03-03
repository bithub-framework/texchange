import Big from 'big.js';
import { OpenOrder, Balances, Closable, Positions, Trade } from 'interfaces';
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
export interface Tasks {
    getBalances: GetBalancesLike;
    getPositions: GetPositionsLike;
    getAvailable: GetAvailableLike;
    getClosable: GetClosableLike;
    settle: SettleLike;
    orderMakes: OrderMakesLike;
    tradeTakesOpenMakers: TradeTakesOpenMakersLike;
    orderTakes: OrderTakesLike;
    validateOrder: ValidateOrderLike;
    makeOpenOrder: MakeOpenOrderLike;
    cancelOpenOrder: CancelOpenOrderLike;
}
