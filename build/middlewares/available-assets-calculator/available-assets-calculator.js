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
exports.AvailableAssetsCalculator = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let AvailableAssetsCalculator = class AvailableAssetsCalculator {
    constructor(context, marketSpec, marginAssets, makers) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.marginAssets = marginAssets;
        this.makers = makers;
    }
    getAvailable() {
        return this.marginAssets.getBalance()
            .minus(this.marginAssets.getFinalMargin())
            .minus(this.getFinalFrozenBalance());
    }
    getFinalFrozenBalance() {
        return this.getUnroundedFinalFrozenBalance()
            .round(this.marketSpec.CURRENCY_SCALE);
    }
    getClosable() {
        const totalFrozen = this.makers.getTotalFrozen();
        const position = this.marginAssets.getPosition();
        return {
            [secretary_like_1.Length.LONG]: position[secretary_like_1.Length.LONG]
                .minus(totalFrozen.position[secretary_like_1.Length.LONG]),
            [secretary_like_1.Length.SHORT]: position[secretary_like_1.Length.SHORT]
                .minus(totalFrozen.position[secretary_like_1.Length.SHORT]),
        };
    }
    getBalances() {
        return {
            balance: this.marginAssets.getBalance(),
            available: this.getAvailable(),
            time: this.context.timeline.now(),
        };
    }
    getPositions() {
        return {
            position: this.marginAssets.getPosition(),
            closable: this.getClosable(),
            time: this.context.timeline.now(),
        };
    }
};
AvailableAssetsCalculator = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.marginAssets)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.makers))
], AvailableAssetsCalculator);
exports.AvailableAssetsCalculator = AvailableAssetsCalculator;
//# sourceMappingURL=available-assets-calculator.js.map