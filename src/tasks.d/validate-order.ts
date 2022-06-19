import {
    Operation, Length,
    HLike,
    OpenOrder,
    MarketSpec,
    AccountSpec,
} from 'secretary-like';

import assert = require('assert');
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { TaskGetAvailable } from './get-available/get-available';
import { TaskGetClosable } from './get-closable';
import { Makers } from '../models.d/makers/makers';


export class TaskValidateOrder<H extends HLike<H>> {
    @instantInject(TYPES.tasks)
    private tasks!: TaskValidateOrder.TaskDeps<H>;

    public constructor(
        @inject(TYPES.context)
        private context: Context<H>,
        @inject(TYPES.marketSpec)
        private marketSpec: MarketSpec<H>,
        @inject(TYPES.accountSpec)
        private accountSpec: AccountSpec,
        @inject(TYPES.models)
        private models: TaskValidateOrder.ModelDeps<H>,
        @inject(TYPES.broadcast)
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
                    this.marketSpec.dollarVolume(
                        order.price, order.unfilled,
                    ).times(
                        Math.max(this.accountSpec.TAKER_FEE_RATE, 0)
                    ).round(this.marketSpec.CURRENCY_DP)
                );
            assert(enoughBalance);
        } finally {
            makers.removeOrder(order.id);
        }
    }

    private validateFormat(order: OpenOrder<H>) {
        assert(order.price.eq(order.price.round(this.marketSpec.PRICE_DP)));
        assert(order.price.mod(this.marketSpec.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.marketSpec.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}

export namespace TaskValidateOrder {
    export interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        getAvailable: TaskGetAvailable<H>;
        getClosable: TaskGetClosable<H>;
    }
}
