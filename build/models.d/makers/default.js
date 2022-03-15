"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMakers = void 0;
const interfaces_1 = require("interfaces");
const makers_1 = require("./makers");
class DefaultMakers extends makers_1.Makers {
    constructor(context) {
        super(context);
        this.context = context;
    }
    toFreeze(order) {
        // 默认单向持仓模式
        const length = order.side * interfaces_1.Operation.OPEN;
        return {
            balance: {
                [length]: this.context.config.market.dollarVolume(order.price, order.unfilled),
                [-length]: this.context.H.from(0),
            },
            position: this.Frozen.ZERO.position,
        };
    }
}
exports.DefaultMakers = DefaultMakers;
//# sourceMappingURL=default.js.map