"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const big_math_1 = require("../big-math");
class Calculation {
    constructor(hub) {
        this.hub = hub;
    }
    dollarVolume(price, quantity) {
        return price.times(quantity);
    }
    quantity(price, dollarVolume) {
        return dollarVolume.div(price);
    }
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    marginIncrement(length, volume, dollarVolume) {
        // 默认非实时结算
        return dollarVolume.div(this.hub.context.config.LEVERAGE);
    }
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    marginDecrement(length, volume, dollarVolume) {
        const { assets, margin } = this.hub.models;
        return margin[length]
            .times(volume)
            .div(assets.position[length]);
    }
    finalMargin() {
        // 默认无锁仓优惠
        // 默认非实时结算
        return this.hub.models.margin[interfaces_1.Length.LONG]
            .plus(this.hub.models.margin[interfaces_1.Length.SHORT]);
    }
    toFreeze(order) {
        // 默认单向持仓模式
        const length = order.side * interfaces_1.Operation.OPEN;
        return {
            balance: {
                [length]: this.dollarVolume(order.price, order.unfilled),
                [-length]: new big_js_1.default(0),
            },
            position: interfaces_1.Frozen.ZERO.position,
        };
    }
    finalFrozenBalance() {
        // 默认单向持仓模式
        const { position } = this.hub.models.assets;
        const { totalFrozen, totalUnfilledQuantity } = this.hub.models.makers;
        const final = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const side = length * interfaces_1.Operation.OPEN;
            const afterDeduction = (0, big_math_1.max)(totalUnfilledQuantity[side].minus(position[-length]), new big_js_1.default(0));
            final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilledQuantity[side]);
        }
        return final[interfaces_1.Length.LONG].plus(final[interfaces_1.Length.SHORT]);
    }
    ClearingMargin(length, profit) {
        // 默认逐仓
        return this.hub.models.margin[length]
            .plus(profit);
    }
    assertEnoughBalance() {
        // 默认逐仓
        for (const length of [interfaces_1.Length.SHORT, interfaces_1.Length.LONG])
            assert(this.hub.models.margin[length].gte(0));
    }
}
exports.Calculation = Calculation;
//# sourceMappingURL=calculation.js.map