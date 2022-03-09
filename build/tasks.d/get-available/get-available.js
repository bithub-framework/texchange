"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailable = void 0;
const task_1 = require("../../task");
class GetAvailable extends task_1.Task {
    getAvailable() {
        return this.models.assets.balance
            .minus(this.finalMargin())
            .minus(this.finalFrozenBalance())
            .round(this.context.config.CURRENCY_DP);
    }
}
exports.GetAvailable = GetAvailable;
//# sourceMappingURL=get-available.js.map