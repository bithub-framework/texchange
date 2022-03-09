import { TasksLike, GetBalancesLike, GetPositionsLike, GetAvailableLike, GetClosableLike, SettleLike, OrderMakesLike, TradeTakesOpenMakersLike, OrderTakesLike, ValidateOrderLike, MakeOpenOrderLike, CancelOpenOrderLike } from './tasks-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { ModelsStatic } from '../models/models-static';
export declare class DefaultTasks implements TasksLike {
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
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast);
}
