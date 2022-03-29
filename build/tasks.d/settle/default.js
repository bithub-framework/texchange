"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSettle = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("interfaces");
const assert = require("assert");
const settle_1 = require("./settle");
/**
* 默认逐仓
*/
class DefaultSettle extends settle_1.Settle {
    constructor(context, models, broadcast) {
        super(context, models, broadcast);
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
__decorate([
    (0, injektor_1.inject)(DefaultSettle.TaskDeps)
], DefaultSettle.prototype, "tasks", void 0);
exports.DefaultSettle = DefaultSettle;
(function (DefaultSettle) {
    DefaultSettle.TaskDeps = {};
})(DefaultSettle = exports.DefaultSettle || (exports.DefaultSettle = {}));
//# sourceMappingURL=default.js.map