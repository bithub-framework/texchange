"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalances = void 0;
class GetBalances {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getBalances() {
        return this.tasks.getBalances.getBalances();
    }
}
exports.GetBalances = GetBalances;
//# sourceMappingURL=get-balances.js.map