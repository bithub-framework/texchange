"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailable = void 0;
class GetAvailable {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getAvailable() {
        return this.models.assets.getBalance()
            .minus(this.finalMargin())
            .minus(this.finalFrozenBalance())
            .round(this.context.config.market.CURRENCY_DP);
    }
}
exports.GetAvailable = GetAvailable;
//# sourceMappingURL=get-available.js.map