"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginManager = void 0;
const interfaces_1 = require("../../interfaces");
const _1_position_margin_manager_1 = require("./1-position-margin-manager");
class MarginManager extends _1_position_margin_manager_1.MarginManager {
    get available() {
        return this.equity.balance
            .minus(this.margin)
            .minus(this.frozenBalance);
    }
    get closable() {
        return {
            [interfaces_1.Length.LONG]: this.equity.position[interfaces_1.Length.LONG]
                .minus(this.frozenPosition[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.equity.position[interfaces_1.Length.SHORT]
                .minus(this.frozenPosition[interfaces_1.Length.SHORT]),
        };
    }
    freeze(frozen) {
        this.frozenBalance = this.frozenBalance.plus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].plus(frozen.position);
        if (this.available.lt(0) || this.closable[frozen.length].lt(0)) {
            this.thaw(frozen);
            throw new Error('No enough to freeze');
        }
    }
    thaw(frozen) {
        this.frozenBalance = this.frozenBalance.minus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].minus(frozen.position);
        if (this.frozenBalance.lt(0) || this.frozenPosition[frozen.length].lt(0)) {
            this.freeze(frozen);
            throw new Error('No enough to thaw');
        }
    }
}
exports.MarginManager = MarginManager;
//# sourceMappingURL=2-freezing-margin-manager.js.map