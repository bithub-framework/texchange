"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPricing = void 0;
const pricing_1 = require("./pricing");
/**
 * 默认以最新价格作为结算价。
 */
class DefaultPricing extends pricing_1.Pricing {
    constructor(context) {
        super();
        this.context = context;
        this.settlementPrice = context.config.account.initialBalance;
    }
    updateTrades(trades) {
        this.settlementPrice = trades[trades.length - 1].price;
    }
    getSettlementPrice() {
        return this.settlementPrice;
    }
    capture() {
        return this.context.H.capture(this.settlementPrice);
    }
    restore(snapshot) {
        this.settlementPrice = this.context.H.restore(snapshot);
    }
}
exports.DefaultPricing = DefaultPricing;
//# sourceMappingURL=default.js.map