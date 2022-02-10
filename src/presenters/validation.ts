import {
    OpenOrder,
    Operation, Length,
} from '../interfaces';
import assert = require('assert');
import { type Hub } from '../hub';
import Big from 'big.js';


export class Validation {
    constructor(protected hub: Hub) { }

    public validateOrder(order: OpenOrder) {
        this.validateFormat(order);
        this.assertEnough(order);
    }

    /**
     * Overridable
     * @param order Plain object.
     */
    protected assertEnough(order: OpenOrder): void {
        const { makers } = this.hub.models;
        makers.appendOrder({ ...order, behind: new Big(0) });

        const closable = this.hub.views.instant.getClosable();
        const enoughPosition =
            closable[Length.LONG].gte(0) &&
            closable[Length.SHORT].gte(0);

        const enoughBalance = this.hub.views.instant.getAvailable()
            .gte(
                this.hub.context.calculation.dollarVolume(
                    order.price, order.unfilled,
                ).times(
                    Math.max(this.hub.context.config.TAKER_FEE_RATE, 0)
                ).round(this.hub.context.config.CURRENCY_DP)
            );

        makers.removeOrder(order.id);
        assert(enoughPosition && enoughBalance);
    }

    private validateFormat(order: OpenOrder) {
        assert(order.price.eq(order.price.round(this.hub.context.config.PRICE_DP)));
        assert(order.price.mod(this.hub.context.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.hub.context.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
