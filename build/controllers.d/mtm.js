"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = exports.Mtm = void 0;
const startable_1 = require("startable");
class Mtm extends startable_1.Startable {
    constructor(context, models, clearing) {
        super();
        this.context = context;
        this.models = models;
        this.clearing = clearing;
    }
}
exports.Mtm = Mtm;
class DefaultMtm extends Mtm {
    constructor(context, models, clearing) {
        super(context, models, clearing);
        this.context = context;
        this.models = models;
        this.clearing = clearing;
        this.involved = [];
        this.markPrice = context.config.initialSettlementPrice;
    }
    updateTrades(trades) {
        this.markPrice = trades[trades.length - 1].price;
        this.clearing.settle();
    }
    getSettlementPrice() {
        return this.markPrice;
    }
    async Startable$rawStart() { }
    async Startable$rawStop() { }
}
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=mtm.js.map