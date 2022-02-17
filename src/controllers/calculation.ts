import {
    OpenOrder,
    MarketCalc,
    Length, Side,
    Frozen,
    Operation,
} from '../interfaces';
import Big from 'big.js';
import assert = require('assert');
import { max } from '../big-math';



export class Calculation implements MarketCalc {
    constructor(protected hub: any) { }

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

    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    public marginIncrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        // 默认非实时结算
        return dollarVolume.div(this.hub.context.config.LEVERAGE);
    }

    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    public marginDecrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        const { assets, margin } = this.hub.models;
        return margin[length]
            .times(volume)
            .div(assets.position[length]);
    }

    public finalMargin(): Big {
        // 默认无锁仓优惠
        // 默认非实时结算
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
        const { position } = this.hub.models.assets;
        const { totalFrozen, totalUnfilledQuantity } = this.hub.models.makers;
        const final: { [length: number]: Big; } = {};
        for (const length of [Length.LONG, Length.SHORT]) {
            const side: Side = length * Operation.OPEN;
            const afterDeduction = max(
                totalUnfilledQuantity[side].minus(position[-length]),
                new Big(0),
            );
            final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilledQuantity[side]);
        }
        return final[Length.LONG].plus(final[Length.SHORT]);
    }

    public clearingMargin(
        length: Length, profit: Big,
    ): Big {
        // 默认逐仓
        return this.hub.models.margin[length]
            .plus(profit);
    }

    public assertEnoughBalance(): void {
        // 默认逐仓
        for (const length of [Length.SHORT, Length.LONG])
            assert(this.hub.models.margin[length].gte(0));
    }
}
