import {
    LimitOrder,
    OpenOrder,
    MarketCalc,
    Length,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
import assert = require('assert');

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

    public initialMargin(order: LimitOrder): Big {
        return order.price
            .times(order.quantity)
            .div(this.core.config.LEVERAGE);
    };

    // this.core.assets.position[order.length] has not updated.
    public marginIncrement(
        order: OpenOrder, volume: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }

    public marginDecrement(
        order: OpenOrder, volume: Big, dollarVolume: Big,
    ): Big {
        return volume
            .div(this.core.states.assets.position[order.length])
            .times(this.core.states.margin[order.length]);
    };

    public totalMargin(): Big {
        return this.core.states.margin[Length.LONG]
            .plus(this.core.states.margin[Length.SHORT]);
    }

    public balanceToFreeze(
        order: OpenOrder,
    ): Big {
        return order.price
            .times(order.quantity)
            .div(this.core.config.LEVERAGE);
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
