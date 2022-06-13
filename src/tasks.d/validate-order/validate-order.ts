import {
    Operation, Length,
    HLike,
    OpenOrder,
} from 'secretary-like';

import assert = require('assert');
import { Context } from '../../context';
import { ValidateOrderLike } from './validate-order-like';
import { Broadcast } from '../../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { GetAvailableLike } from '../get-available/get-available-like';
import { GetClosableLike } from '../get-closable/get-closable-like';
import { Makers } from '../../models.d/makers/makers';


export class ValidateOrder<H extends HLike<H>>
    implements ValidateOrderLike<H> {
    @instantInject(TYPES.Tasks)
    private tasks!: ValidateOrder.TaskDeps<H>;

    public constructor(
        @inject(TYPES.Context)
        private context: Context<H>,
        @inject(TYPES.Models)
        private models: ValidateOrder.ModelDeps<H>,
        @inject(TYPES.Broadcast)
        private broadcast: Broadcast<H>,
    ) { }

    public validateOrder(order: OpenOrder<H>): void {
        this.validateFormat(order);
        this.validateQuantity(order);
    }

    private validateQuantity(order: OpenOrder<H>): void {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder(
            order,
            new this.context.Data.H(0),
        );
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
                        Math.max(this.context.spec.account.TAKER_FEE_RATE, 0)
                    ).round(this.context.spec.market.CURRENCY_DP)
                );
            assert(enoughBalance);
        } finally {
            makers.removeOrder(order.id);
        }
    }

    private validateFormat(order: OpenOrder<H>) {
        assert(order.price.eq(order.price.round(this.context.spec.market.PRICE_DP)));
        assert(order.price.mod(this.context.spec.market.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.context.spec.market.QUANTITY_DP)));
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
