"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const model_1 = require("../model");
const big_js_1 = require("big.js");
class Progress extends model_1.Model {
    constructor(context) {
        super();
        this.context = context;
        this.latestPrice = null;
        this.latestDatabaseTradeTime = null;
        this.userTradeCount = 0;
        this.userOrderCount = 0;
    }
    updateDatabaseTrades(trades) {
        const now = this.context.timeline.now();
        this.latestDatabaseTradeTime = now;
        this.latestPrice = trades[trades.length - 1].price;
    }
    capture() {
        return {
            latestPrice: this.latestPrice
                ? this.latestPrice.toString()
                : null,
            latestDatabaseTradeTime: this.latestDatabaseTradeTime,
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }
    restore(snapshot) {
        this.latestPrice = snapshot.latestPrice === null
            ? null
            : new big_js_1.default(snapshot.latestPrice);
        this.latestDatabaseTradeTime = snapshot.latestDatabaseTradeTime;
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}
exports.Progress = Progress;
//# sourceMappingURL=progress.js.map