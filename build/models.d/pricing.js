"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPricing = exports.Pricing = void 0;
const big_js_1 = require("big.js");
const model_1 = require("./model");
class Pricing extends model_1.Model {
    constructor(context, settlementPrice) {
        super(context);
        this.context = context;
        this.settlementPrice = settlementPrice;
    }
}
exports.Pricing = Pricing;
class DefaultPricing extends Pricing {
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