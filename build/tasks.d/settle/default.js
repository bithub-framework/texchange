"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSettle = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
const settle_1 = require("./settle");
/**
* 默认逐仓
*/
class DefaultSettle extends settle_1.Settle {
    constructor(tasks, context, models, broadcast) {
        super(context, models, broadcast);
        this.tasks = tasks;
        this.models = models;
    }
    clearingMargin(length, profit) {
        return this.models.margins.getMargin()[length]
            .plus(profit);
    }
    assertEnoughBalance() {
        for (const length of [interfaces_1.Length.SHORT, interfaces_1.Length.LONG])
            assert(this.models.margins.getMargin()[length].gte(0));
    }
}
exports.DefaultSettle = DefaultSettle;
//# sourceMappingURL=default.js.map