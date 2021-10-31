import {
    OpenOrder,
    Operation, Length,
} from '../interfaces';
import assert = require('assert');
import { Core } from '../core';
import Big from 'big.js';


export class MethodsValidation {
    constructor(protected core: Core) { }

    public validateOrder(order: OpenOrder) {
        this.validateFormat(order);
        this.assertEnough(order);
    }

    /**
     * Overridable
     * @param order Plain object.
     */
    protected assertEnough(order: OpenOrder): void {
        const { makers } = this.core.states;
        makers.appendOrder({ ...order, behind: new Big(0) });

        const closable = this.core.interfaces.instant.getClosable();
        const enoughPosition =
            closable[Length.LONG].gte(0) &&
            closable[Length.SHORT].gte(0);

        const enoughBalance = this.core.interfaces.instant.getAvailable()
            .gte(
                this.core.calculation.dollarVolume(
                    order.price, order.unfilled,
                ).times(
                    Math.max(this.core.config.TAKER_FEE_RATE, 0)
                ).round(this.core.config.CURRENCY_DP)
            );

        makers.removeOrder(order.id);
        assert(enoughPosition && enoughBalance);
    }

    private validateFormat(order: OpenOrder) {
        assert(order.price.eq(order.price.round(this.core.config.PRICE_DP)));
        assert(order.price.mod(this.core.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.core.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
