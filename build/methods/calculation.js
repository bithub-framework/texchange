"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsCalculation = void 0;
const interfaces_1 = require("../interfaces");
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
    marginIncrement(order, volume, dollarVolume) {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }
    marginDecrement(order, volume, dollarVolume) {
        return volume
            .div(this.core.states.assets.position[order.length])
            .times(this.core.states.margin[order.length]);
    }
    ;
    totalMargin() {
        return this.core.states.margin[interfaces_1.Length.LONG]
            .plus(this.core.states.margin[interfaces_1.Length.SHORT]);
    }
    balanceToFreeze(order) {
        return order.price
            .times(order.quantity)
            .div(this.core.config.LEVERAGE);
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