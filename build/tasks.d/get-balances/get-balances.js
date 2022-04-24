"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalances = void 0;
class GetBalances {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    getBalances() {
        return {
            balance: this.models.assets.getBalance(),
            available: this.tasks.getAvailable.getAvailable(),
            time: this.context.timeline.now(),
        };
    }
}
exports.GetBalances = GetBalances;
//# sourceMappingURL=get-balances.js.map