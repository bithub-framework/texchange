"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailable = void 0;
const interfaces_1 = require("interfaces");
const big_js_1 = require("big.js");
const task_1 = require("./task");
const utilities_1 = require("../utilities");
class GetAvailable extends task_1.Task {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getAvailable() {
        return this.models.assets.balance
            .minus(this.finalMargin())
            .minus(this.finalFrozenBalance())
            .round(this.context.config.CURRENCY_DP);
    }
    finalMargin() {
        // 默认无锁仓优惠
        // 默认非实时结算
        return this.models.margin[interfaces_1.Length.LONG]
            .plus(this.models.margin[interfaces_1.Length.SHORT]);
    }
    finalFrozenBalance() {
        // 默认单向持仓模式
        const { position } = this.models.assets;
        const { totalFrozen, totalUnfilledQuantity } = this.models.makers;
        const final = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const side = length * interfaces_1.Operation.OPEN;
            const afterDeduction = (0, utilities_1.max)(totalUnfilledQuantity[side].minus(position[-length]), new big_js_1.default(0));
            final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilledQuantity[side]);
        }
        return final[interfaces_1.Length.LONG].plus(final[interfaces_1.Length.SHORT]);
    }
}
exports.GetAvailable = GetAvailable;
//# sourceMappingURL=get-available.js.map