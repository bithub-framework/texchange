"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsCalculation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const big_math_1 = require("../big-math");
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
    // public initialMargin(order: LimitOrder): Big {
    //     return this.dollarVolume(order.price, order.quantity)
    //         .div(this.core.config.LEVERAGE);
    // };
    // this.core.assets.position[order.length] has not updated.
    marginIncrement(length, volume, dollarVolume) {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }
    marginDecrement(length, volume, dollarVolume) {
        return volume
            .div(this.core.states.assets.position[length])
            .times(this.core.states.margin[length]);
    }
    ;
    totalMargin() {
        return this.core.states.margin[interfaces_1.Length.LONG]
            .plus(this.core.states.margin[interfaces_1.Length.SHORT]);
    }
    totalFrozenBalance() {
        const totalUnfilled = this.core.states.makers.totalUnfilled;
        const position = this.core.states.assets.position;
        const frozen = this.core.states.margin.frozen;
        const total = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            total[length] = big_math_1.max(totalUnfilled[length].minus(position[-length]), new big_js_1.default(0)).div(totalUnfilled[length])
                .times(frozen.balance[length]);
        }
        return total[interfaces_1.Length.LONG].plus(total[interfaces_1.Length.SHORT]);
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
    // order has not been updated
    toThaw(order, frozen, volume, dollarVolume) {
        const length = order.side * interfaces_1.Operation.OPEN;
        return {
            balance: {
                [length]: volume.div(order.unfilled).times(frozen.balance[length]),
                [-length]: new big_js_1.default(0),
            },
            position: {
                [interfaces_1.Length.LONG]: new big_js_1.default(0),
                [interfaces_1.Length.SHORT]: new big_js_1.default(0),
            },
        };
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