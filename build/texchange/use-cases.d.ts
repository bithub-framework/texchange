import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { Subscription } from '../use-cases.d/subscription';
import { GetProgress } from '../use-cases.d/get-progress';
import { HLike } from 'secretary-like';
export declare class UseCases<H extends HLike<H>> {
    makeOrder: MakeOrder<H>;
    cancelOrder: CancelOrder<H>;
    amendOrder: AmendOrder<H>;
    getOpenOrders: GetOpenOrders<H>;
    getPositions: GetPositions<H>;
    getBalances: GetBalances<H>;
    updateOrderbook: UpdateOrderbook<H>;
    subscription: Subscription<H>;
    getProgress: GetProgress<H>;
    updateTrades: UpdateTrades<H>;
    constructor(makeOrder: MakeOrder<H>, cancelOrder: CancelOrder<H>, amendOrder: AmendOrder<H>, getOpenOrders: GetOpenOrders<H>, getPositions: GetPositions<H>, getBalances: GetBalances<H>, updateOrderbook: UpdateOrderbook<H>, subscription: Subscription<H>, getProgress: GetProgress<H>, updateTrades: UpdateTrades<H>);
}
