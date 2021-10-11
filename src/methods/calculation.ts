import {
    LimitOrder,
    OpenOrder,
    OpenMaker,
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

    public positionMarginIncrement(
        order: OpenOrder, volume: Big, dollarVolume: Big,
    ): Big {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }

    public positionMarginDecrement(
        order: OpenOrder, volume: Big, dollarVolume: Big,
    ): Big {
        if (this.core.states.assets.position[order.length].eq(volume))
            return this.core.states.margin.positionMargin[order.length];
        else
            return dollarVolume.div(this.core.config.LEVERAGE);
    };

    public totalPositionMargin(): Big {
        return this.core.states.margin.positionMargin[Length.LONG]
            .plus(this.core.states.margin.positionMargin[Length.SHORT]);
    }

    public freezingMargin(
        order: OpenMaker | LimitOrder,
    ): Big {
        return order.price.times(order.quantity);
    }

    public positionMarginOnClearing(): Big {
        return new Big(0);
    }

    public shouldBeCompulsorilyLiquidated(): boolean {
        return this.core.states.assets.balance
            .lt(this.totalPositionMargin());
    }
}
