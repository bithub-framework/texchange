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
        const { assets, makers } = this.core.states;
        if (order.operation === Operation.CLOSE)
            assert(
                order.unfilled.lte(
                    assets.position[order.length]
                        .minus(makers.frozenSum.position[order.length])
                ),
            );
    }

    private assertEnoughAvailable(order: OpenOrder) {
        if (order.operation === Operation.OPEN) {
            const frozen = this.core.calculation.toFreeze(order);
            assert(
                frozen.balance[Length.LONG]
                    .plus(frozen.balance[Length.SHORT])
                    .plus(
                        this.core.calculation.dollarVolume(
                            order.price, order.unfilled,
                        ).times(this.core.config.TAKER_FEE_RATE),
                    ).round(this.core.config.CURRENCY_DP)
                    .lte(this.core.interfaces.instant.getAvailable()),
            );
        }
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
