"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = exports.Mtm = void 0;
const startable_1 = require("startable");
class Mtm extends startable_1.Startable {
    constructor(context, models, stages, clearing) {
        super();
        this.context = context;
        this.models = models;
        this.stages = stages;
        this.clearing = clearing;
    }
}
exports.Mtm = Mtm;
Mtm.involved = [];
class DefaultMtm extends Mtm {
    constructor(context, models, stages, clearing) {
        super(context, models, stages, clearing);
        this.context = context;
        this.models = models;
        this.stages = stages;
        this.clearing = clearing;
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
DefaultMtm.involved = [...Mtm.involved];
//# sourceMappingURL=mtm.js.map