import { Context } from '../../context';
import { LimitOrder, Positions, Balances, OpenOrder, Amendment, HLike } from 'secretary-like';
import { UseCaseMakeOrder } from '../../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../../use-cases.d/amend-order';
import { UseCaseGetPositions } from '../../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../../use-cases.d/get-balances';
import { UseCaseGetOpenOrders } from '../../use-cases.d/get-open-orders';
export declare class Instant<H extends HLike<H>> {
    private context;
    private useCases;
    constructor(context: Context<H>, useCases: Instant.UseCaseDeps<H>);
    makeOrders(orders: LimitOrder<H>[]): (OpenOrder<H> | Error)[];
    cancelOrders(orders: OpenOrder<H>[]): OpenOrder<H>[];
    amendOrders(amendments: Amendment<H>[]): (OpenOrder<H> | Error)[];
    getOpenOrders(): OpenOrder<H>[];
    getPositions(): Positions<H>;
    getBalances(): Balances<H>;
}
export declare namespace Instant {
    interface UseCaseDeps<H extends HLike<H>> {
        makeOrder: UseCaseMakeOrder<H>;
        cancelOrder: UseCaseCancelOrder<H>;
        amendOrder: UseCaseAmendOrder<H>;
        getOpenOrders: UseCaseGetOpenOrders<H>;
        getBalances: UseCaseGetBalances<H>;
        getPositions: UseCaseGetPositions<H>;
    }
}
