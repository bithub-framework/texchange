"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const big_math_1 = require("../big-math");
/*
    TODO
    cross margin
    single position
    reverse contract
    spot
*/
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
    // this.hub.assets.position[order.length] has not been updated.
    marginIncrement(length, volume, dollarVolume) {
        return dollarVolume.div(this.hub.context.config.LEVERAGE);
    }
    finalMargin() {
        // 默认无锁仓优惠
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
        const totalUnfilledQuantity = this.hub.models.makers.totalUnfilledQuantity;
        const position = this.hub.models.assets.position;
        const totalFrozen = this.hub.models.makers.totalFrozen;
        const final = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const side = length * interfaces_1.Operation.OPEN;
            final[length] = totalFrozen.balance[length]
                .times((0, big_math_1.max)(totalUnfilledQuantity[side].minus(position[-length]), new big_js_1.default(0)))
                .div(totalUnfilledQuantity[side]);
        }
        return final[interfaces_1.Length.LONG].plus(final[interfaces_1.Length.SHORT]);
    }
    ClearingMargin(length, profit) {
        // 默认逐仓
        return this.hub.models.margin[length]
            .plus(profit);
    }
    shouldLiquidate() {
        const result = [];
        const { margin } = this.hub.models;
        for (const length of [interfaces_1.Length.SHORT, interfaces_1.Length.LONG])
            if (margin[length].lt(0))
                return length;
        return null;
    }
}
exports.Calculation = Calculation;
//# sourceMappingURL=calculation.js.map