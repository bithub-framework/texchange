import {
    OpenOrder,
    MarketCalc,
    Length,
    Frozen,
    Operation,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
import assert = require('assert');
import { max } from '../big-math';

/*
    TODO
    cross margin
    single position
    reverse contract
    spot
*/

export class MethodsCalculation implements MarketCalc {
    constructor(
        private core: Core,
    ) { }

    public dollarVolume(
        price: Big, quantity: Big,
    ): Big {
        return price.times(quantity);
    }

    public quantity(
        price: Big, dollarVolume: Big,
    ): Big {
        assert(price.gt(0));
        return dollarVolume.div(price);
    }

    // this.core.assets.position[order.length] has not been updated.
    public marginIncrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }

    public finalMargin(): Big {
        return this.core.states.margin[Length.LONG]
            .plus(this.core.states.margin[Length.SHORT]);
    }

    public toFreeze(
        order: OpenOrder,
    ): Frozen {
        const length: Length = order.side * Operation.OPEN;
        return {
            balance: {
                [length]: this.dollarVolume(order.price, order.unfilled),
                [-length]: new Big(0),
            },
            position: {
                [Length.LONG]: new Big(0),
                [Length.SHORT]: new Big(0),
            },
        };
    }

    public finalFrozenBalance(): Big {
        const unfilledSum = this.core.states.makers.unfilledSum;
        const position = this.core.states.assets.position;
        const frozenSum = this.core.states.makers.frozenSum;
        const final: {
            [length: number]: Big;
        } = {};
        for (const length of [Length.LONG, Length.SHORT]) {
            final[length] = max(
                unfilledSum[length].minus(position[-length]),
                new Big(0),
            )
                .times(frozenSum.balance[length])
                .div(unfilledSum[length]);
        }
        return final[Length.LONG].plus(final[Length.SHORT]);
    }

    public marginOnSettlement(
        length: Length, profit: Big,
    ): Big {
        return this.core.states.margin[length]
            .plus(profit);
    }

    public shouldLiquidate(): Length[] {
        return [];
    }
}
