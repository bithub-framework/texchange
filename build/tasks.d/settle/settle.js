"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settle = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("interfaces");
class Settle {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    settle() {
        const { config, calc } = this.context;
        const { assets, margins, pricing } = this.models;
        const position = assets.getPosition();
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const dollarVolume = calc.dollarVolume(settlementPrice, position[length]).round(config.market.CURRENCY_DP);
            const profit = assets.close(length, position[length], dollarVolume);
            assets.open(length, position[length], dollarVolume);
            margins.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }
}
Settle.TaskDeps = {};
__decorate([
    (0, injektor_1.inject)(Settle.TaskDeps)
], Settle.prototype, "tasks", void 0);
exports.Settle = Settle;
//# sourceMappingURL=settle.js.map