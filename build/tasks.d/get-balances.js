"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalances = void 0;
const task_1 = require("./task");
class GetBalances extends task_1.Task {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
        this.tasks = tasks;
    }
    getBalances() {
        return {
            balance: this.models.assets.balance,
            available: this.tasks.getAvailable.getAvailable(),
            time: this.context.timeline.now(),
        };
    }
}
exports.GetBalances = GetBalances;
//# sourceMappingURL=get-balances.js.map