"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSettle = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
class TaskSettle {
    settle() {
        const { assets, margins, pricing } = this.models;
        const position = assets.getPosition();
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [secretary_like_1.Length.LONG, secretary_like_1.Length.SHORT]) {
            const dollarVolume = this.marketSpec.dollarVolume(settlementPrice, position[length]).round(this.marketSpec.CURRENCY_DP);
            const profit = assets.close(length, position[length], dollarVolume);
            assets.open(length, position[length], dollarVolume);
            margins.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }
}
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.tasks)
], TaskSettle.prototype, "tasks", void 0);
exports.TaskSettle = TaskSettle;
//# sourceMappingURL=settle.js.map