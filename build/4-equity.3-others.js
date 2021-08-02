"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_equity_2_taken_1 = require("./4-equity.2-taken");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
class Texchange extends _4_equity_2_taken_1.Texchange {
    clear() {
        const position = interfaces_1.clone(this.equity.position);
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const clearingDollarVolume = this.config.calcDollarVolume(this.clearingPrice, position[length]).round(this.config.CURRENCY_DP);
            this.equity.closePosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
            this.equity.openPosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
        }
    }
    /** @override */
    cancelOpenOrder(order) {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        this.makers.removeOrder(order.id);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=4-equity.3-others.js.map