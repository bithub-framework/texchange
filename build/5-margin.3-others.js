"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const _5_margin_2_taken_1 = require("./5-margin.2-taken");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
class Core extends _5_margin_2_taken_1.Core {
    /** @override */
    settle() {
        const position = interfaces_1.clone(this.equity.position);
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const clearingDollarVolume = this.config.calcDollarVolume(this.markPrice, position[length]).round(this.config.CURRENCY_DP);
            this.equity.closePosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
            this.equity.openPosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
        }
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT])
            this.margin.setPositionMargin(length, this.config.calcPositionMarginOnSettlement({
                spec: this.config,
                latestPrice: this.latestPrice,
                markPrice: this.markPrice,
                balance: this.equity.balance,
                cost: this.equity.cost,
                position: this.equity.position,
                positionMargin: this.margin.positionMargin,
                frozenBalance: this.margin.frozenBalance,
                frozenPosition: this.margin.frozenPosition,
                time: this.now(),
            }));
    }
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
exports.Core = Core;
//# sourceMappingURL=5-margin.3-others.js.map