"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
class Instant {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
    }
    makeOrders(orders) {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }
    amendOrders(amendments) {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return this.useCases.getOpenOrders.getOpenOrders();
    }
    getPositions() {
        return this.useCases.getPositions.getPositions();
    }
    getBalances() {
        return this.useCases.getBalances.getBalances();
    }
}
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map