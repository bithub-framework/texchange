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
    getFinalFrozenBalance() {
        const position = this.marginAssets.getPosition();
        const totalFrozen = this.makers.getTotalFrozen();
        const totalUnfilled = this.makers.getTotalUnfilled();
        const $final = {};
        for (const length of [secretary_like_1.Length.LONG, secretary_like_1.Length.SHORT]) {
            const side = length * secretary_like_1.Operation.OPEN;
            const afterDeduction = this.context.Data.H.max(totalUnfilled[side].minus(position[-length]), new this.context.Data.H(0));
            $final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilled[side]);
        }
        return $final[secretary_like_1.Length.LONG].plus($final[secretary_like_1.Length.SHORT]);
    }
};
DefaultAvailableAssetsCalculator = __decorate([
    (0, injektor_1.injextends)()
], DefaultAvailableAssetsCalculator);
exports.DefaultAvailableAssetsCalculator = DefaultAvailableAssetsCalculator;
//# sourceMappingURL=default.js.map