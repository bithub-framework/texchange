import {
    OpenOrder,
    Operation,
    Length,
} from 'interfaces';
import assert = require('assert');
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, ValidateOrderLike } from '../tasks';
import { Broadcast } from '../broadcast';



export class ValidateOrder extends Task
    implements ValidateOrderLike {
    constructor(
        protected context: Context,
        protected models: Models,
        protected broadcast: Broadcast,
        protected tasks: Tasks,
    ) {
        super();
    }

    public validateOrder(order: Readonly<OpenOrder>): void {
        this.validateFormat(order);
        this.validateQuantity(order);
    }

    private validateQuantity(order: Readonly<OpenOrder>): void {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder({ ...order, behind: new Big(0) });
        try {
            const enoughPosition =
                closable[Length.LONG].gte(0) &&
                closable[Length.SHORT].gte(0);
            assert(enoughPosition);

            const enoughBalance = this.tasks.getAvailable.getAvailable()
                .gte(
                    this.context.config.dollarVolume(
                        order.price, order.unfilled,
                    ).times(
                        Math.max(this.context.config.TAKER_FEE_RATE, 0)
                    ).round(this.context.config.CURRENCY_DP)
                );
            assert(enoughBalance);
        } finally {
            makers.removeOrder(order.id);
        }
    }

    private validateFormat(order: Readonly<OpenOrder>) {
        assert(order.price.eq(order.price.round(this.context.config.PRICE_DP)));
        assert(order.price.mod(this.context.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.context.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
