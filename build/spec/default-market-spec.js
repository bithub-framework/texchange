"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarketSpec = void 0;
const injektor_1 = require("@zimtsui/injektor");
const assert = require("assert");
const market_spec_1 = require("./market-spec");
/**
 * 默认正向合约
 */
let DefaultMarketSpec = class DefaultMarketSpec extends market_spec_1.MarketSpec {
    constructor() {
        super(...arguments);
        this.PRICE_SCALE = 2;
        this.QUANTITY_SCALE = 3;
        this.CURRENCY_SCALE = 2;
        this.MARKET_NAME = 'test';
    }
    unroundedQuantity(price, dollarVolume) {
        assert(price.neq(0));
        return dollarVolume.div(price, this.QUANTITY_SCALE);
    }
    unroundedDollarVolume(price, quantity) {
        return price.times(quantity)
            .round(this.CURRENCY_SCALE);
    }
};
DefaultMarketSpec = __decorate([
    (0, injektor_1.injextends)()
], DefaultMarketSpec);
exports.DefaultMarketSpec = DefaultMarketSpec;
//# sourceMappingURL=default-market-spec.js.map