import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Broadcast } from '../broadcast';
import { TasksLike } from '../tasks/tasks-like';
import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { UseCasesLike } from './use-cases-like';
import { HLike } from 'interfaces';
/**
 * 默认实时结算
 */
export declare class DefaultUseCases<H extends HLike<H>> implements UseCasesLike<H> {
    readonly makeOrder: MakeOrder<H>;
    readonly cancelOrder: CancelOrder<H>;
    readonly amendOrder: AmendOrder<H>;
    readonly getOpenOrders: GetOpenOrders<H>;
    readonly getPositions: GetPositions<H>;
    readonly getBalances: GetBalances<H>;
    readonly updateOrderbook: UpdateOrderbook<H>;
    readonly updateTrades: UpdateTrades<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
}
