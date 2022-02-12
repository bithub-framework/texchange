"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = exports.Mtm = void 0;
const big_js_1 = require("big.js");
class Mtm {
    constructor(hub, markPrice) {
        this.hub = hub;
        this.markPrice = markPrice;
    }
}
exports.Mtm = Mtm;
class DefaultMtm extends Mtm {
    updateTrades(trades) {
        this.markPrice = trades[trades.length - 1].price;
        this.hub.presenters.clearing.settle();
    }
    getSettlementPrice() {
        return this.markPrice;
    }
    capture() {
        return this.markPrice;
    }
    restore(snapshot) {
        this.markPrice = new big_js_1.default(snapshot);
    }
}
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=mtm.js.map