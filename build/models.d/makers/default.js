"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMakers = void 0;
const interfaces_1 = require("interfaces");
const makers_1 = require("./makers");
class DefaultMakers extends makers_1.Makers {
    constructor(context) {
        super(context);
    }
    /**
     * 默认单向持仓模式
     */
    toFreeze(order) {
        if (order.operation === interfaces_1.Operation.OPEN)
            return {
                balance: {
                    [order.length]: this.context.calc.dollarVolume(order.price, order.unfilled),
                    [-order.length]: this.context.H.from(0),
                },
                position: this.Frozen.ZERO.position,
            };
        else
            return {
                balance: this.Frozen.ZERO.balance,
                position: {
                    [order.length]: order.unfilled,
                    [-order.length]: this.context.H.from(0),
                },
            };
    }
}
exports.DefaultMakers = DefaultMakers;
//# sourceMappingURL=default.js.map