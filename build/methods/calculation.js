"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsCalculation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
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
    initialMargin(order) {
        return order.price
            .times(order.quantity)
            .div(this.core.config.LEVERAGE);
    }
    ;
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
    toFreeze(order) {
        if (order.operation === interfaces_1.Operation.OPEN)
            return {
                balance: order.price.times(order.unfilled).div(this.core.config.LEVERAGE),
                position: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(0),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(0),
                },
            };
        else
            return {
                balance: new big_js_1.default(0),
                position: {
                    [order.length]: order.unfilled,
                    [-order.length]: new big_js_1.default(0),
                },
            };
    }
    toThaw(order, frozen, volume, dollarVolume) {
        if (order.operation === interfaces_1.Operation.OPEN)
            return {
                balance: volume.div(order.unfilled).times(frozen.balance),
                position: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(0),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(0),
                },
            };
        else
            return {
                balance: new big_js_1.default(0),
                position: {
                    [order.length]: volume,
                    [-order.length]: new big_js_1.default(0),
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