import { TasksLike, GetBalancesLike, GetPositionsLike, GetAvailableLike, GetClosableLike, SettleLike, OrderMakesLike, TradeTakesOpenMakersLike, OrderTakesLike, ValidateOrderLike, MakeOpenOrderLike, CancelOpenOrderLike, MarginAccumulationLike, OrderVolumesLike } from './tasks-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { StatefulModels } from '../models/stateful-models';
import { HLike } from 'interfaces';
export declare class DefaultTasks<H extends HLike<H>> implements TasksLike<H> {
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
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>);
}
