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
exports.MarketSpec = void 0;
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let MarketSpec = class MarketSpec {
    constructor(context) {
        this.TICK_SIZE = context.dataTypes.hFactory.from('.01');
    }
    quantity(price, dollarVolume) {
        assert(price.neq(0));
        return this.unroundedQuantity(price, dollarVolume)
            .round(this.QUANTITY_DP);
    }
    dollarVolume(price, quantity) {
        return this.unroundedDollarVolume(price, quantity)
            .round(this.CURRENCY_DP);
    }
};
MarketSpec = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context))
], MarketSpec);
exports.MarketSpec = MarketSpec;
//# sourceMappingURL=market-spec.js.map