import {
    ConcreteOpenOrder,
    Operation, Length,
    HLike,
} from 'interfaces';
import assert = require('assert');
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, ValidateOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';



export class ValidateOrder<H extends HLike<H>> extends Task<H>
    implements ValidateOrderLike<H> {
    constructor(
        protected readonly context: Context<H>,
        protected readonly models: StatefulModels<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: TasksLike<H>,
    ) { super(); }

    public validateOrder(order: ConcreteOpenOrder<H>): void {
        this.validateFormat(order);
        this.validateQuantity(order);
    }

    private validateQuantity(order: ConcreteOpenOrder<H>): void {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder({
            // TODO remove "..."
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
                    this.context.config.market.dollarVolume(
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

    private validateFormat(order: ConcreteOpenOrder<H>) {
        assert(order.price.eq(order.price.round(this.context.config.market.PRICE_DP)));
        assert(order.price.mod(this.context.config.market.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.context.config.market.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
