import { Context } from '../context';
import { TexchangeOpenOrder, LimitOrder, TexchangeAmendment, Positions, Balances } from 'interfaces';
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
    makeOrders(orders: LimitOrder<H>[]): (TexchangeOpenOrder<H> | Error)[];
    cancelOrders(orders: TexchangeOpenOrder<H>[]): TexchangeOpenOrder<H>[];
    amendOrders(amendments: TexchangeAmendment<H>[]): (TexchangeOpenOrder<H> | Error)[];
    getOpenOrders(): TexchangeOpenOrder<H>[];
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
