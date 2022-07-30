import { VirtualMachineContextLike } from '../../vmctx';
import {
    LimitOrderLike,
    PositionsLike,
    BalancesLike,
    OpenOrderLike,
    AmendmentLike,
    HLike,
} from 'secretary-like';

import { UseCaseMakeOrder } from '../../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../../use-cases.d/amend-order';
import { UseCaseGetPositions } from '../../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../../use-cases.d/get-balances';
import { UseCaseGetOpenOrders } from '../../use-cases.d/get-open-orders';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';



export class Instant<H extends HLike<H>> {
    public constructor(
        @inject(TYPES.vmctx)
        private context: VirtualMachineContextLike<H>,
        @inject(TYPES.USE_CASES.makeOrder)
        private useCaseMakeOrder: UseCaseMakeOrder<H>,
        @inject(TYPES.USE_CASES.cancelOrder)
        private useCaseCancelOrder: UseCaseCancelOrder<H>,
        @inject(TYPES.USE_CASES.amendOrder)
        private useCaseAmendOrder: UseCaseAmendOrder<H>,
        @inject(TYPES.USE_CASES.getOpenOrders)
        private useCaseGetOpenOrders: UseCaseGetOpenOrders<H>,
        @inject(TYPES.USE_CASES.getBalances)
        private useCaseGetBalances: UseCaseGetBalances<H>,
        @inject(TYPES.USE_CASES.getPositions)
        private useCaseGetPositions: UseCaseGetPositions<H>,
    ) { }

    public makeOrders(
        orders: LimitOrderLike<H>[],
    ): (OpenOrderLike<H> | Error)[] {
        return orders.map(order => {
            try {
                return this.useCaseMakeOrder.makeOrder(order);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(
        orders: OpenOrderLike<H>[],
    ): OpenOrderLike<H>[] {
        return orders.map(order => this.useCaseCancelOrder.cancelOrder(order));
    }

    public amendOrders(
        amendments: AmendmentLike<H>[],
    ): (OpenOrderLike<H> | Error)[] {
        return amendments.map(amendment => {
            try {
                return this.useCaseAmendOrder.amendOrder(amendment);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public getOpenOrders(): OpenOrderLike<H>[] {
        return this.useCaseGetOpenOrders.getOpenOrders();
    }

    public getPositions(): PositionsLike<H> {
        return this.useCaseGetPositions.getPositions();
    }

    public getBalances(): BalancesLike<H> {
        return this.useCaseGetBalances.getBalances();
    }
}
