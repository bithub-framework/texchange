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
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCaseUpdateTrades = class UseCaseUpdateTrades {
    constructor(context, models, broadcast, tasks, realTimeSettlement) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.realTimeSettlement = realTimeSettlement;
    }
    updateTrades(trades) {
        const { tradeTakesOpenMakers, settle } = this.tasks;
        assert(trades.length);
        const now = this.context.timeline.now();
        for (const trade of trades)
            assert(trade.time === now);
        this.models.progress.updateDatabaseTrades(trades);
        this.broadcast.emit('trades', trades);
        for (const trade of trades)
            tradeTakesOpenMakers.tradeTakesOpenMakers(trade);
        this.models.pricing.updateTrades(trades);
        if (this.realTimeSettlement)
            settle.settle();
    }
};
UseCaseUpdateTrades = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.Tasks)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.realTimeSettlement))
], UseCaseUpdateTrades);
exports.UseCaseUpdateTrades = UseCaseUpdateTrades;
//# sourceMappingURL=update-trades.js.map