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
    positionMarginIncrement(order, volume, dollarVolume) {
        return dollarVolume.div(this.core.config.LEVERAGE);
    }
    positionMarginDecrement(order, volume, dollarVolume) {
        if (this.core.states.assets.position[order.length].eq(volume))
            return this.core.states.margin.positionMargin[order.length];
        else
            return dollarVolume.div(this.core.config.LEVERAGE);
    }
    ;
    totalPositionMargin() {
        return this.core.states.margin.positionMargin[interfaces_1.Length.LONG]
            .plus(this.core.states.margin.positionMargin[interfaces_1.Length.SHORT]);
    }
    freezingMargin(order) {
        return order.price.times(order.quantity);
    }
    positionMarginOnClearing() {
        return new big_js_1.default(0);
    }
    shouldBeCompulsorilyLiquidated() {
        return this.core.states.assets.balance
            .lt(this.totalPositionMargin());
    }
}
exports.MethodsCalculation = MethodsCalculation;
//# sourceMappingURL=calculation.js.map