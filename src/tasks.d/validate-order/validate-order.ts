import {
    TexchangeOpenOrder,
    TexchangeOrderIdStatic,
    TexchangeOpenOrderStatic,
    Operation, Length,
    HLike,
} from 'interfaces';
import assert = require('assert');
import { Context } from '../../context/context';
import { ValidateOrderLike } from './validate-order-like';
import { Broadcast } from '../../broadcast';

import { GetAvailableLike } from '../get-available/get-available-like';
import { GetClosableLike } from '../get-closable/get-closable-like';
import { Makers } from '../../models.d/makers/makers';


export class ValidateOrder<H extends HLike<H>>
    implements ValidateOrderLike<H> {

    private OrderId = new TexchangeOrderIdStatic();
    private OpenOrder = new TexchangeOpenOrderStatic(this.context.H, this.OrderId);

    public constructor(
        protected context: Context<H>,
        protected models: ValidateOrder.ModelDeps<H>,
        protected broadcast: Broadcast<H>,
        protected tasks: ValidateOrder.TaskDeps<H>,
    ) { }

    public validateOrder(order: TexchangeOpenOrder<H>): void {
        this.validateFormat(order);
        this.validateQuantity(order);
    }

    private validateQuantity(order: TexchangeOpenOrder<H>): void {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder({
            ...order,
            behind: this.context.H.from(0),
        });
        try {
            const enoughPosition =
                closable[Length.LONG].gte(0) &&
                closable[Length.SHORT].gte(0);
            assert(enoughPosition);

            const enoughBalance = this.tasks.getAvailable.getAvailable()
                .gte(
                    this.context.calc.dollarVolume(
                        order.price, order.unfilled,
                    ).times(
                        Math.max(this.context.config.account.TAKER_FEE_RATE, 0)
                    ).round(this.context.config.market.CURRENCY_DP)
                );
            assert(enoughBalance);
        } finally {
            makers.removeOrder(order.id);
        }
    }

    private validateFormat(order: TexchangeOpenOrder<H>) {
        assert(order.price.eq(order.price.round(this.context.config.market.PRICE_DP)));
        assert(order.price.mod(this.context.config.market.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.context.config.market.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}

export namespace ValidateOrder {
    export interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        getAvailable: GetAvailableLike<H>;
        getClosable: GetClosableLike<H>;
    }
}
