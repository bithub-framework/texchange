import {
    LimitOrder,
    OpenOrder,
    MarketCalc,
    Length,
    Frozen,
    Operation,
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
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }

    public marginDecrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        return volume
            .div(this.core.states.assets.position[length])
            .times(this.core.states.margin[length]);
    };

    public totalMargin(): Big {
        return this.core.states.margin[Length.LONG]
            .plus(this.core.states.margin[Length.SHORT]);
    }

    public toFreeze(
        order: OpenOrder,
    ): Frozen {
        if (order.operation === Operation.OPEN)
            return {
                balance: order.price.times(order.unfilled).div(this.core.config.LEVERAGE),
                position: {
                    [Length.LONG]: new Big(0),
                    [Length.SHORT]: new Big(0),
                },
            }
        else
            return {
                balance: new Big(0),
                position: {
                    [order.length]: order.unfilled,
                    [-order.length]: new Big(0),
                },
            }
    }

    public toThaw(
        order: OpenOrder,
        frozen: Frozen,
        volume: Big,
        dollarVolume: Big,
    ): Frozen {
        if (order.operation === Operation.OPEN)
            return {
                balance: volume.div(order.unfilled).times(frozen.balance),
                position: {
                    [Length.LONG]: new Big(0),
                    [Length.SHORT]: new Big(0),
                },
            }
        else
            return {
                balance: new Big(0),
                position: {
                    [order.length]: volume,
                    [-order.length]: new Big(0),
                },
            }
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
