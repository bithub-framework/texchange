"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalances = void 0;
const use_case_1 = require("./use-case");
class GetBalances extends use_case_1.UseCase {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
        this.tasks = tasks;
    }
    getBalances() {
        return this.tasks.getBalances.getBalances();
    }
}
exports.GetBalances = GetBalances;
//# sourceMappingURL=get-balances.js.map