"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMakers = void 0;
const interfaces_1 = require("interfaces");
const frozon_1 = require("./frozon");
const big_js_1 = require("big.js");
const makers_1 = require("./makers");
class DefaultMakers extends makers_1.Makers {
    constructor(context) {
        super();
        this.context = context;
    }
    toFreeze(order) {
        // 默认单向持仓模式
        const length = order.side * interfaces_1.Operation.OPEN;
        return {
            balance: {
                [length]: this.context.config.dollarVolume(order.price, order.unfilled),
                [-length]: new big_js_1.default(0),
            },
            position: frozon_1.Frozen.ZERO.position,
        };
    }
}
exports.DefaultMakers = DefaultMakers;
//# sourceMappingURL=default.js.map