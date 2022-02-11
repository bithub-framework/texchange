"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCalculation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const big_math_1 = require("../big-math");
class DefaultCalculation {
    constructor(hub) {
        this.hub = hub;
    }
    dollarVolume(price, quantity) {
        return price.times(quantity);
    }
    quantity(price, dollarVolume) {
        assert(price.gt(0));
        return dollarVolume.div(price);
    }
    // this.core.assets.position[order.length] has not been updated.
    marginIncrement(length, volume, dollarVolume) {
        return dollarVolume.div(this.hub.context.config.LEVERAGE);
    }
    finalMargin() {
        return this.hub.models.margin[interfaces_1.Length.LONG]
            .plus(this.hub.models.margin[interfaces_1.Length.SHORT]);
    }
    toFreeze(order) {
        const length = order.side * interfaces_1.Operation.OPEN;
        return {
            balance: {
                [length]: this.dollarVolume(order.price, order.unfilled),
                [-length]: new big_js_1.default(0),
            },
            position: {
                [interfaces_1.Length.LONG]: new big_js_1.default(0),
                [interfaces_1.Length.SHORT]: new big_js_1.default(0),
            },
        };
    }
    finalFrozenBalance() {
        const unfilledSum = this.hub.models.makers.unfilledSum;
        const position = this.hub.models.assets.position;
        const frozenSum = this.hub.models.makers.frozenSum;
        const final = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            final[length] = (0, big_math_1.max)(unfilledSum[length].minus(position[-length]), new big_js_1.default(0))
                .times(frozenSum.balance[length])
                .div(unfilledSum[length]);
        }
        return final[interfaces_1.Length.LONG].plus(final[interfaces_1.Length.SHORT]);
    }
    marginOnSettlement(length, profit) {
        return this.hub.models.margin[length]
            .plus(profit);
    }
    shouldLiquidate() {
        return [];
    }
}
exports.DefaultCalculation = DefaultCalculation;
//# sourceMappingURL=calculation.js.map