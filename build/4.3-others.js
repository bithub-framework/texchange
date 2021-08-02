"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_2_taken_1 = require("./4.2-taken");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
class Texchange extends _4_2_taken_1.Texchange {
    settle() {
        const position = interfaces_1.clone(this.assets.position);
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const settlementDollarVolume = this.config.calcDollarVolume(this.settlementPrice, position[length]).round(this.config.CURRENCY_DP);
            this.assets.closePosition(length, position[length], settlementDollarVolume, new big_js_1.default(0));
            this.assets.openPosition(length, position[length], settlementDollarVolume, new big_js_1.default(0));
        }
    }
    /** @override */
    cancelOpenOrder(order) {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        const toThaw = this.makers.removeOrder(order.id);
        if (toThaw)
            this.assets.thaw(toThaw);
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
    getPositions() {
        this.settle();
        return interfaces_1.clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
    }
    getBalances() {
        this.settle();
        return interfaces_1.clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
    }
    pushPositionsAndBalances() {
        this.settle();
        const positions = interfaces_1.clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
        const balances = interfaces_1.clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=4.3-others.js.map