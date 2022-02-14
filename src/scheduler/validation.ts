import {
    OpenOrder,
    Operation, Length,
} from '../interfaces';
import assert = require('assert');
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { AccountView } from './account-view';



export class Validation {
    constructor(
        private context: Context,
        private models: Models,
        private accountView: AccountView,
    ) { }

    public validateOrder(order: Readonly<OpenOrder>) {
        this.validateFormat(order);
        this.validateQuantity(order);
    }

    /**
     * Can be called only in consistent states
     */
    private validateQuantity(order: Readonly<OpenOrder>): void {
        const { makers } = this.models;
        const closable = this.accountView.getClosable();
        makers.appendOrder({ ...order, behind: new Big(0) });
        try {
            const enoughPosition =
                closable[Length.LONG].gte(0) &&
                closable[Length.SHORT].gte(0);
            assert(enoughPosition);

            const enoughBalance = this.accountView.getAvailable()
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
