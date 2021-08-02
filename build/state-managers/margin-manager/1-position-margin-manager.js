"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginManager = void 0;
class MarginManager {
    get margin() {
        return this.config.revisePositionMargin({
            spec: this.config,
            position: this.equity.position,
            cost: this.equity.cost,
            clearingPrice: this.getClearingPrice(),
            latestPrice: this.getLatestPrice(),
            marginSum: this.marginSum,
        }).round(this.config.CURRENCY_DP);
    }
    incMargin(increment) {
        this.marginSum = this.marginSum.plus(increment);
    }
    decMargin(decrement) {
        this.marginSum = this.marginSum.minus(decrement);
    }
}
exports.MarginManager = MarginManager;
//# sourceMappingURL=1-position-margin-manager.js.map