import { Context } from '../context';
import {
    LimitOrder,
    Positions,
    Balances,
    OpenOrder,
    Amendment,
    HLike,
} from 'secretary-like';

import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class Instant<H extends HLike<H>> {
    public constructor(
        @inject(TYPES.Context)
        private context: Context<H>,
        @inject(TYPES.UseCases)
        private useCases: Instant.UseCaseDeps<H>,
    ) { }

    public makeOrders(
        orders: LimitOrder<H>[],
    ): (OpenOrder<H> | Error)[] {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(
        orders: OpenOrder<H>[],
    ): OpenOrder<H>[] {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }

    public amendOrders(
        amendments: Amendment<H>[],
    ): (OpenOrder<H> | Error)[] {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public getOpenOrders(): OpenOrder<H>[] {
        return this.useCases.getOpenOrders.getOpenOrders();
    }

    public getPositions(): Positions<H> {
        return this.useCases.getPositions.getPositions();
    }

    public getBalances(): Balances<H> {
        return this.useCases.getBalances.getBalances();
    }
}

export namespace Instant {
    export interface UseCaseDeps<H extends HLike<H>> {
        makeOrder: MakeOrder<H>;
        cancelOrder: CancelOrder<H>;
        amendOrder: AmendOrder<H>;
        getOpenOrders: GetOpenOrders<H>;
        getBalances: GetBalances<H>;
        getPositions: GetPositions<H>;
    }
}
