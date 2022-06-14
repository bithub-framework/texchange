import { UseCaseMakeOrder } from '../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../use-cases.d/amend-order';
import { UseCaseGetOpenOrders } from '../use-cases.d/get-open-orders';
import { UseCaseGetPositions } from '../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../use-cases.d/get-balances';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseSubscription } from '../use-cases.d/subscription';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';
import { HLike } from 'secretary-like';
export declare class UseCases<H extends HLike<H>> {
    makeOrder: UseCaseMakeOrder<H>;
    cancelOrder: UseCaseCancelOrder<H>;
    amendOrder: UseCaseAmendOrder<H>;
    getOpenOrders: UseCaseGetOpenOrders<H>;
    getPositions: UseCaseGetPositions<H>;
    getBalances: UseCaseGetBalances<H>;
    updateOrderbook: UseCaseUpdateOrderbook<H>;
    subscription: UseCaseSubscription<H>;
    getProgress: UseCaseGetProgress<H>;
    updateTrades: UseCaseUpdateTrades<H>;
    constructor(makeOrder: UseCaseMakeOrder<H>, cancelOrder: UseCaseCancelOrder<H>, amendOrder: UseCaseAmendOrder<H>, getOpenOrders: UseCaseGetOpenOrders<H>, getPositions: UseCaseGetPositions<H>, getBalances: UseCaseGetBalances<H>, updateOrderbook: UseCaseUpdateOrderbook<H>, subscription: UseCaseSubscription<H>, getProgress: UseCaseGetProgress<H>, updateTrades: UseCaseUpdateTrades<H>);
}
