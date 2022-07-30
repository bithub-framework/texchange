import { VirtualMachineContextLike } from '../../vmctx';
import { LimitOrderLike, PositionsLike, BalancesLike, OpenOrderLike, AmendmentLike, HLike } from 'secretary-like';
import { UseCaseMakeOrder } from '../../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../../use-cases.d/amend-order';
import { UseCaseGetPositions } from '../../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../../use-cases.d/get-balances';
import { UseCaseGetOpenOrders } from '../../use-cases.d/get-open-orders';
export declare class Instant<H extends HLike<H>> {
    private context;
    private useCaseMakeOrder;
    private useCaseCancelOrder;
    private useCaseAmendOrder;
    private useCaseGetOpenOrders;
    private useCaseGetBalances;
    private useCaseGetPositions;
    constructor(context: VirtualMachineContextLike<H>, useCaseMakeOrder: UseCaseMakeOrder<H>, useCaseCancelOrder: UseCaseCancelOrder<H>, useCaseAmendOrder: UseCaseAmendOrder<H>, useCaseGetOpenOrders: UseCaseGetOpenOrders<H>, useCaseGetBalances: UseCaseGetBalances<H>, useCaseGetPositions: UseCaseGetPositions<H>);
    makeOrders(orders: LimitOrderLike<H>[]): (OpenOrderLike<H> | Error)[];
    cancelOrders(orders: OpenOrderLike<H>[]): OpenOrderLike<H>[];
    amendOrders(amendments: AmendmentLike<H>[]): (OpenOrderLike<H> | Error)[];
    getOpenOrders(): OpenOrderLike<H>[];
    getPositions(): PositionsLike<H>;
    getBalances(): BalancesLike<H>;
}
