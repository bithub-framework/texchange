"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPricing = exports.Pricing = void 0;
const big_js_1 = require("big.js");
class Pricing {
    constructor(context, settlementPrice) {
        this.context = context;
        this.settlementPrice = settlementPrice;
    }
}
exports.Pricing = Pricing;
class DefaultPricing extends Pricing {
    initializeStage() {
        this.stage = false;
    }
    updateTrades(trades) {
        this.settlementPrice = trades[trades.length - 1].price;
    }
    getSettlementPrice() {
        return this.settlementPrice;
    }
    capture() {
        return this.settlementPrice;
    }
    restore(snapshot) {
        this.settlementPrice = new big_js_1.default(snapshot);
    }
}
exports.DefaultPricing = DefaultPricing;
//# sourceMappingURL=pricing.js.map