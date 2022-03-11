"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPricing = void 0;
const big_js_1 = require("big.js");
const pricing_1 = require("./pricing");
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
        return this.settlementPrice.toString();
    }
    restore(snapshot) {
        this.settlementPrice = new big_js_1.default(snapshot);
    }
}
exports.DefaultPricing = DefaultPricing;
//# sourceMappingURL=default.js.map