"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultGetAvailable = void 0;
const secretary_like_1 = require("secretary-like");
const get_available_1 = require("./get-available");
class DefaultGetAvailable extends get_available_1.GetAvailable {
    constructor(tasks, context, models, broadcast) {
        super(context, models, broadcast);
        this.tasks = tasks;
        this.models = models;
    }
    finalMargin() {
        // 默认无锁仓优惠
        const margin = this.models.margins.getMargin();
        return margin[secretary_like_1.Length.LONG]
            .plus(margin[secretary_like_1.Length.SHORT]);
    }
    finalFrozenBalance() {
        // 默认单向持仓模式
        const position = this.models.assets.getPosition();
        const totalFrozen = this.models.makers.getTotalFrozen();
        const totalUnfilled = this.models.makers.getTotalUnfilled();
        const $final = {};
        for (const length of [secretary_like_1.Length.LONG, secretary_like_1.Length.SHORT]) {
            const side = length * secretary_like_1.Operation.OPEN;
            const afterDeduction = this.context.Data.H.max(totalUnfilled[side].minus(position[-length]), new this.context.Data.H(0));
            $final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilled[side]);
        }
        return $final[secretary_like_1.Length.LONG].plus($final[secretary_like_1.Length.SHORT]);
    }
}
exports.DefaultGetAvailable = DefaultGetAvailable;
//# sourceMappingURL=default.js.map