"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _5_margin_2_taken_1 = require("./5-margin.2-taken");
const interfaces_1 = require("./interfaces");
class Texchange extends _5_margin_2_taken_1.Texchange {
    /** @override */
    cancelOpenOrder(order) {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        const toThaw = this.makers.removeOrder(order.id);
        if (toThaw)
            this.margin.thaw(toThaw);
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
        const positions = {
            position: this.equity.position,
            closable: this.margin.closable,
            time: this.now(),
        };
        return interfaces_1.clone(positions);
    }
    getBalances() {
        this.settle();
        const balances = {
            balance: this.equity.balance,
            available: this.margin.available,
            time: this.now(),
        };
        return interfaces_1.clone(balances);
    }
    pushPositionsAndBalances() {
        this.settle();
        const positions = {
            position: this.equity.position,
            closable: this.margin.closable,
            time: this.now(),
        };
        const balances = {
            balance: this.equity.balance,
            available: this.margin.available,
            time: this.now(),
        };
        this.emit('positions', interfaces_1.clone(positions));
        this.emit('balances', interfaces_1.clone(balances));
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=5-margin.3-others.js.map