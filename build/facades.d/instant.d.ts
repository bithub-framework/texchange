import { Context } from '../context';
import { LimitOrder, Positions, Balances, OpenOrder, Amendment } from 'interfaces';
import { HLike } from 'interfaces';
import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
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
        makeOrder: MakeOrder<H>;
        cancelOrder: CancelOrder<H>;
        amendOrder: AmendOrder<H>;
        getOpenOrders: GetOpenOrders<H>;
        getBalances: GetBalances<H>;
        getPositions: GetPositions<H>;
    }
}
