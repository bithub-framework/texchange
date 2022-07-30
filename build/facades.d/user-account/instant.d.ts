import { VirtualMachineContextLike } from '../../vmctx';
import { LimitOrder, Positions, Balances, OpenOrder, Amendment, HLike } from 'secretary-like';
import { UseCaseMakeOrder } from '../../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../../use-cases.d/amend-order';
import { UseCaseGetPositions } from '../../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../../use-cases.d/get-balances';
import { UseCaseGetOpenOrders } from '../../use-cases.d/get-open-orders';
export declare class Instant<H extends HLike<H>> {
    private vMCTX;
    private useCaseMakeOrder;
    private useCaseCancelOrder;
    private useCaseAmendOrder;
    private useCaseGetOpenOrders;
    private useCaseGetBalances;
    private useCaseGetPositions;
    constructor(vMCTX: VirtualMachineContextLike<H>, useCaseMakeOrder: UseCaseMakeOrder<H>, useCaseCancelOrder: UseCaseCancelOrder<H>, useCaseAmendOrder: UseCaseAmendOrder<H>, useCaseGetOpenOrders: UseCaseGetOpenOrders<H>, useCaseGetBalances: UseCaseGetBalances<H>, useCaseGetPositions: UseCaseGetPositions<H>);
    makeOrders(orders: LimitOrder<H>[]): (OpenOrder<H> | Error)[];
    cancelOrders(orders: OpenOrder<H>[]): OpenOrder<H>[];
    amendOrders(amendments: Amendment<H>[]): (OpenOrder<H> | Error)[];
    getOpenOrders(): OpenOrder<H>[];
    getPositions(): Positions<H>;
    getBalances(): Balances<H>;
}
