"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountView = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const big_math_1 = require("../big-math");
const assert = require("assert");
class AccountView {
    constructor(context, models) {
        this.context = context;
        this.models = models;
        // TODO 看看编译后是什么
        this.involved = [
            this.models.assets,
            this.models.makers,
            this.models.margin,
        ];
    }
    getAvailable() {
        assert(this.models.assets.stage === this.models.margin.stage);
        assert(this.models.assets.stage === this.models.makers.stage);
        return this.models.assets.balance
            .minus(this.finalMargin())
            .minus(this.finalFrozenBalance())
            .round(this.context.config.CURRENCY_DP);
    }
    getClosable() {
        const { assets, makers } = this.models;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(makers.totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(makers.totalFrozen.position[interfaces_1.Length.SHORT]),
        };
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
            const afterDeduction = (0, big_math_1.max)(totalUnfilledQuantity[side].minus(position[-length]), new big_js_1.default(0));
            final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilledQuantity[side]);
        }
        return final[interfaces_1.Length.LONG].plus(final[interfaces_1.Length.SHORT]);
    }
}
exports.AccountView = AccountView;
//# sourceMappingURL=account-view.js.map