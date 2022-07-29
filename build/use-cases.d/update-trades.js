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
exports.UseCaseUpdateTrades = void 0;
const assert = require("assert");
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCaseUpdateTrades = class UseCaseUpdateTrades {
    constructor(context, marginAssets, progress, pricing, broadcast, databaseTradeHandler, mtm) {
        this.context = context;
        this.marginAssets = marginAssets;
        this.progress = progress;
        this.pricing = pricing;
        this.broadcast = broadcast;
        this.databaseTradeHandler = databaseTradeHandler;
        this.mtm = mtm;
    }
    updateTrades(trades) {
        assert(trades.length);
        const now = this.context.timeline.now();
        for (const trade of trades)
            assert(trade.time === now);
        this.progress.updateDatabaseTrades(trades);
        this.broadcast.emit('trades', trades);
        for (const trade of trades)
            this.databaseTradeHandler.tradeTakesOpenMakers(trade);
        this.pricing.updateTrades(trades);
        if (this.mtm === null) {
            this.marginAssets.settle(secretary_like_1.Length.LONG, this.pricing.getSettlementPrice());
            this.marginAssets.settle(secretary_like_1.Length.SHORT, this.pricing.getSettlementPrice());
        }
    }
};
UseCaseUpdateTrades = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vmctx)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.MODELS.marginAssets)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.progress)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.pricing)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.broadcast)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.databaseTradeHandler)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.mtm))
], UseCaseUpdateTrades);
exports.UseCaseUpdateTrades = UseCaseUpdateTrades;
//# sourceMappingURL=update-trades.js.map