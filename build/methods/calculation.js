"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsCalculation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const big_math_1 = require("../big-math");
/*
    TODO
    cross margin
    single position
    reverse contract
    spot
*/
class MethodsCalculation {
    constructor(core) {
        this.core = core;
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
        return dollarVolume.div(this.core.config.LEVERAGE);
    }
    finalMargin() {
        return this.core.states.margin[interfaces_1.Length.LONG]
            .plus(this.core.states.margin[interfaces_1.Length.SHORT]);
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
        const unfilledSum = this.core.states.makers.unfilledSum;
        const position = this.core.states.assets.position;
        const frozenSum = this.core.states.makers.frozenSum;
        const final = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            final[length] = big_math_1.max(unfilledSum[length].minus(position[-length]), new big_js_1.default(0))
                .times(frozenSum.balance[length])
                .div(unfilledSum[length]);
        }
        return final[interfaces_1.Length.LONG].plus(final[interfaces_1.Length.SHORT]);
    }
    marginOnSettlement(length, profit) {
        return this.core.states.margin[length]
            .plus(profit);
    }
    shouldLiquidate() {
        return [];
    }
}
exports.MethodsCalculation = MethodsCalculation;
//# sourceMappingURL=calculation.js.map