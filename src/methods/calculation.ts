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
    cross margin
    single position
    forward contract
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

    // this.core.assets.position[order.length] has not updated.
    public marginIncrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }

    // this.core.assets.position[order.length] has not updated.
    public marginDecrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        const { assets } = this.core.states;
        // 单向持仓模式下，volume 可能大于 assets.position[length]
        if (volume.lte(assets.position[length]))
            return volume
                .div(this.core.states.assets.position[length])
                .times(this.core.states.margin[length]);
        else
            return this.core.states.margin[length];
    };

    public totalMargin(): Big {
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

    public totalFrozenBalance(): Big {
        const totalUnfilled = this.core.states.makers.totalUnfilled;
        const position = this.core.states.assets.position;
        const frozen = this.core.states.margin.frozen;
        const total: {
            [length: number]: Big;
        } = {};
        for (const length of [Length.LONG, Length.SHORT]) {
            total[length] = max(
                totalUnfilled[length].minus(position[-length]),
                new Big(0),
            )
                .times(frozen.balance[length])
                .div(totalUnfilled[length]);
        }
        return total[Length.LONG].plus(total[Length.SHORT]);
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
