"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUseCases = void 0;
const update_trades_1 = require("../use-cases.d/update-trades");
const use_cases_1 = require("./use-cases");
/**
 * 默认实时结算
 */
class DefaultUseCases extends use_cases_1.UseCases {
    constructor(context, models, broadcast, tasks) {
        super(context, models, broadcast, tasks);
        this.updateTrades = new update_trades_1.UpdateTrades(context, models, broadcast, tasks, true);
    }
}
exports.DefaultUseCases = DefaultUseCases;
//# sourceMappingURL=default.js.map