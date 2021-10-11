"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsOrdering = void 0;
class MethodsOrdering {
    constructor(core) {
        this.core = core;
    }
    cancelOpenOrder(order) {
        const filled = this.core.states.makers.get(order.id)?.filled || order.quantity;
        const toThaw = this.core.states.makers.removeOrder(order.id);
        if (toThaw)
            this.core.states.margin.thaw(toThaw);
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
    makeOpenOrder(order) {
        const trades = this.core.taking.orderTakes(order);
        this.core.making.orderMakes(order);
        if (trades.length) {
            for (const trade of trades)
                this.core.states.mtm.updateTrade(trade);
            this.core.interfaces.instant.pushTrades(trades);
            this.core.interfaces.instant.pushOrderbook();
            this.core.interfaces.instant.pushPositionsAndBalances();
        }
        return order;
    }
}
exports.MethodsOrdering = MethodsOrdering;
//# sourceMappingURL=ordering.js.map