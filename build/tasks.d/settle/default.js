"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTaskSettle = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
const settle_1 = require("./settle");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/default/types");
/**
* 默认逐仓
*/
let DefaultTaskSettle = class DefaultTaskSettle extends settle_1.TaskSettle {
    constructor(marketSpec, models) {
        super();
        this.marketSpec = marketSpec;
        this.models = models;
    }
    clearingMargin(length, profit) {
        return this.models.margins.getMargin()[length]
            .plus(profit);
    }
    assertEnoughBalance() {
        for (const length of [secretary_like_1.Length.SHORT, secretary_like_1.Length.LONG])
            assert(this.models.margins.getMargin()[length].gte(0));
    }
};
DefaultTaskSettle = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.models))
], DefaultTaskSettle);
exports.DefaultTaskSettle = DefaultTaskSettle;
//# sourceMappingURL=default.js.map