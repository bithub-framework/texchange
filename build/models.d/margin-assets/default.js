"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarginAssets = void 0;
const margin_assets_1 = require("./margin-assets");
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
let DefaultMarginAssets = class DefaultMarginAssets extends margin_assets_1.MarginAssets {
    // 默认逐仓
    settle(length, settlementPrice) {
        const profit = this.assets.settle(length, settlementPrice);
        this.$margin.set(length, this.$margin.get(length).plus(profit));
    }
    // public settle(
    // 	length: Length,
    // 	settlementPrice: H,
    // ): void {
    // 	const dollarVolume = this.marketSpec.dollarVolume(
    // 		settlementPrice, this.assets.getPosition()[length],
    // 	).round(this.marketSpec.CURRENCY_DP);
    // 	const executed: Executed<H> = {
    // 		length,
    // 		volume: this.assets.getPosition()[length],
    // 		dollarVolume,
    // 	};
    // 	this.close(executed);
    // 	this.open(executed);
    // }
    // 默认无锁仓优惠
    getFinalMargin() {
        return this.$margin.get(secretary_like_1.Length.LONG)
            .plus(this.$margin.get(secretary_like_1.Length.SHORT));
    }
    assertEnoughBalance() {
        assert(this.$margin.get(secretary_like_1.Length.LONG).gte(0));
        assert(this.$margin.get(secretary_like_1.Length.SHORT).gte(0));
    }
};
DefaultMarginAssets = __decorate([
    (0, injektor_1.injextends)()
], DefaultMarginAssets);
exports.DefaultMarginAssets = DefaultMarginAssets;
//# sourceMappingURL=default.js.map