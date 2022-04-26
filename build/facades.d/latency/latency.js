"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latency = void 0;
const market_1 = require("./market");
const account_1 = require("./account");
class Latency {
    constructor(context, useCases, instant) {
        this.market = new market_1.MarketLatency(context, useCases);
        this.account = new account_1.AccountLatency(context, useCases, instant);
    }
}
exports.Latency = Latency;
//# sourceMappingURL=latency.js.map