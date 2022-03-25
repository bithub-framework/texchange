"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOpenOrders = void 0;
class GetOpenOrders {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getOpenOrders() {
        return [...this.models.makers];
    }
}
exports.GetOpenOrders = GetOpenOrders;
//# sourceMappingURL=get-open-orders.js.map