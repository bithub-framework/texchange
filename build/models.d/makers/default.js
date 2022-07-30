"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMakers = void 0;
const secretary_like_1 = require("secretary-like");
const makers_1 = require("./makers");
class DefaultMakers extends makers_1.Makers {
    // 默认单向持仓模式
    toFreeze(order) {
        if (order.action === secretary_like_1.Action.OPEN) {
            const balance = {
                [secretary_like_1.Length.LONG]: this.context.DataTypes.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.context.DataTypes.hFactory.from(0),
            };
            balance[order.length] = this.marketSpec
                .dollarVolume(order.price, order.unfilled)
                .div(this.accountSpec.LEVERAGE, this.marketSpec.CURRENCY_SCALE);
            balance[secretary_like_1.Length.invert(order.length)] = this.context.DataTypes.hFactory.from(0);
            return {
                balance,
                position: this.context.DataTypes.Frozen.ZERO.position,
            };
        }
        else {
            const position = {
                [secretary_like_1.Length.LONG]: this.context.DataTypes.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.context.DataTypes.hFactory.from(0),
            };
            position[order.length] = order.unfilled;
            position[secretary_like_1.Length.invert(order.length)] = this.context.DataTypes.hFactory.from(0);
            return {
                balance: this.context.DataTypes.Frozen.ZERO.balance,
                position: position,
            };
        }
    }
}
exports.DefaultMakers = DefaultMakers;
//# sourceMappingURL=default.js.map