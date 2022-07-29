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
exports.DefaultPricing = void 0;
const pricing_1 = require("./pricing");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/default/types");
// 默认以最新价格作为结算价。
let DefaultPricing = class DefaultPricing extends pricing_1.Pricing {
    constructor(context, settlementPrice) {
        super();
        this.context = context;
        this.settlementPrice = settlementPrice;
    }
    updateTrades(trades) {
        this.settlementPrice = trades[trades.length - 1].price;
    }
    getSettlementPrice() {
        return this.settlementPrice;
    }
    capture() {
        return this.context.DataTypes.hFactory.capture(this.settlementPrice);
    }
    restore(snapshot) {
        this.settlementPrice = this.context.DataTypes.hFactory.restore(snapshot);
    }
};
DefaultPricing = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vmctx)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.initialSettlementPrice))
], DefaultPricing);
exports.DefaultPricing = DefaultPricing;
//# sourceMappingURL=default.js.map