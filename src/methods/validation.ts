import {
    OpenOrder,
    Operation, Length,
} from '../interfaces';
import assert = require('assert');
import { Core } from '../core';

export class MethodsValidation {
    constructor(
        protected core: Core,
    ) { }

    public validateOrder(order: OpenOrder) {
        this.formatCorrect(order);
        this.assertEnoughPosition(order);
        this.assertEnoughAvailable(order);
    }

    private assertEnoughPosition(order: OpenOrder) {
        if (order.operation === Operation.CLOSE)
            assert(
                order.unfilled.lte(
                    this.core.states.assets.position[order.length]
                        .minus(this.core.states.margin.frozenPosition[order.length])
                ),
            );
    }

    private assertEnoughAvailable(order: OpenOrder) {
        if (order.operation === Operation.OPEN)
            assert(
                this.core.calculation.toFreeze(order).balance
                    .plus(
                        this.core.calculation.dollarVolume(
                            order.price, order.unfilled,
                        ).times(this.core.config.TAKER_FEE_RATE),
                    ).round(this.core.config.CURRENCY_DP)
                    .lte(this.core.states.margin.available),
            );
    }

    private formatCorrect(order: OpenOrder) {
        assert(order.price.eq(order.price.round(this.core.config.PRICE_DP)));
        assert(order.price.mod(this.core.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.core.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
