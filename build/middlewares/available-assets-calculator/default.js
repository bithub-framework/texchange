"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAvailableAssetsCalculator = void 0;
const available_assets_calculator_1 = require("./available-assets-calculator");
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
let DefaultAvailableAssetsCalculator = class DefaultAvailableAssetsCalculator extends available_assets_calculator_1.AvailableAssetsCalculator {
    // 默认单向持仓模式
    getUnroundedFinalFrozenBalance() {
        const position = this.marginAssets.getPosition();
        const totalFrozen = this.makers.getTotalFrozen();
        const totalUnfilled = this.makers.getTotalUnfilled();
        const $final = {
            [secretary_like_1.Length.LONG]: this.context.dataTypes.hFactory.from(0),
            [secretary_like_1.Length.SHORT]: this.context.dataTypes.hFactory.from(0),
        };
        for (const length of [secretary_like_1.Length.LONG, secretary_like_1.Length.SHORT]) {
            const side = secretary_like_1.Side.from(length, secretary_like_1.Action.OPEN);
            const afterDeduction = this.context.dataTypes.H.max(totalUnfilled[side].minus(position[secretary_like_1.Length.invert(length)]), this.context.dataTypes.hFactory.from(0));
            $final[length] = totalUnfilled[side].neq(0)
                ? totalFrozen.balance[length]
                    .times(afterDeduction)
                    .div(totalUnfilled[side], this.marketSpec.CURRENCY_DP)
                : this.context.dataTypes.hFactory.from(0);
        }
        return $final[secretary_like_1.Length.LONG].plus($final[secretary_like_1.Length.SHORT]);
    }
};
DefaultAvailableAssetsCalculator = __decorate([
    (0, injektor_1.injextends)()
], DefaultAvailableAssetsCalculator);
exports.DefaultAvailableAssetsCalculator = DefaultAvailableAssetsCalculator;
//# sourceMappingURL=default.js.map