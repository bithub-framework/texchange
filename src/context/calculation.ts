import {
    OpenOrder,
    MarketCalc,
    Length, Side,
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

export class Calculation implements MarketCalc {
    constructor(protected hub: Hub) { }

    public dollarVolume(
        price: Big, quantity: Big,
    ): Big {
        return price.times(quantity);
    }

    public quantity(
        price: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(price);
    }

    // this.hub.assets.position[order.length] has not been updated.
    public marginIncrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(this.hub.context.config.LEVERAGE);
    }

    public finalMargin(): Big {
        // 默认无锁仓优惠
        return this.hub.models.margin[Length.LONG]
            .plus(this.hub.models.margin[Length.SHORT]);
    }

    public toFreeze(
        order: OpenOrder,
    ): Frozen {
        // 默认单向持仓模式
        const length: Length = order.side * Operation.OPEN;
        return {
            balance: {
                [length]: this.dollarVolume(order.price, order.unfilled),
                [-length]: new Big(0),
            },
            position: Frozen.ZERO.position,
        };
    }

    public finalFrozenBalance(): Big {
        // 默认单向持仓模式
        const totalUnfilledQuantity = this.hub.models.makers.totalUnfilledQuantity;
        const position = this.hub.models.assets.position;
        const totalFrozen = this.hub.models.makers.totalFrozen;
        const final: { [length: number]: Big; } = {};
        for (const length of [Length.LONG, Length.SHORT]) {
            const side: Side = length * Operation.OPEN;
            final[length] = totalFrozen.balance[length]
                .times(max(
                    totalUnfilledQuantity[side].minus(position[-length]),
                    new Big(0),
                ))
                .div(totalUnfilledQuantity[side]);
        }
        return final[Length.LONG].plus(final[Length.SHORT]);
    }

    public ClearingMargin(
        length: Length, profit: Big,
    ): Big {
        // 默认逐仓
        return this.hub.models.margin[length]
            .plus(profit);
    }

    public shouldLiquidate(): Length | null {
        const result: Length[] = [];
        const { margin } = this.hub.models;
        for (const length of [Length.SHORT, Length.LONG])
            if (margin[length].lt(0))
                return length;
        return null;
    }
}