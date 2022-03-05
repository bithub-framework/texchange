"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSettle = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
const settle_1 = require("./settle");
class DefaultSettle extends settle_1.Settle {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    clearingMargin(length, profit) {
        // 默认逐仓
        return this.models.margin[length]
            .plus(profit);
    }
    assertEnoughBalance() {
        // 默认逐仓
        for (const length of [interfaces_1.Length.SHORT, interfaces_1.Length.LONG])
            assert(this.models.margin[length].gte(0));
    }
}
exports.DefaultSettle = DefaultSettle;
//# sourceMappingURL=default.js.map