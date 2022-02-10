import {
    OpenOrder,
    MarketCalc,
    Length,
    Frozen,
    Operation,
} from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';
import assert = require('assert');
import { max } from '../big-math';

/*
    TODO
    cross margin
    single position
    reverse contract
    spot
*/

export abstract class Calculation implements MarketCalc {
    constructor(private hub: Hub) { }

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
        return dollarVolume.div(this.hub.context.config.LEVERAGE);
    }

    public finalMargin(): Big {
        return this.hub.models.margin[Length.LONG]
            .plus(this.hub.models.margin[Length.SHORT]);
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
        const unfilledSum = this.hub.models.makers.unfilledSum;
        const position = this.hub.models.assets.position;
        const frozenSum = this.hub.models.makers.frozenSum;
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
        return this.hub.models.margin[length]
            .plus(profit);
    }

    public shouldLiquidate(): Length[] {
        return [];
    }
}

export class DefaultCalculation extends Calculation { }
