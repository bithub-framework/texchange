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
exports.Progress = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let Progress = class Progress {
    constructor(vmctx) {
        this.vmctx = vmctx;
        this.userTradeCount = 0;
        this.userOrderCount = 0;
        this.latestDatabaseTradeId = null;
        this.latestDatabaseOrderbookId = null;
    }
    updateDatabaseTrades(trades) {
        this.latestDatabaseTradeId = trades[trades.length - 1].id;
    }
    getLatestDatabaseOrderbookId() {
        return this.latestDatabaseOrderbookId;
    }
    updateDatabaseOrderbook(orderbook) {
        this.latestDatabaseOrderbookId = orderbook.id;
    }
    getLatestDatabaseTradeId() {
        return this.latestDatabaseTradeId;
    }
    capture() {
        return {
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
            latestDatabaseOrderbookId: this.latestDatabaseOrderbookId,
            latestDatabaseTradeId: this.latestDatabaseTradeId,
        };
    }
    restore(snapshot) {
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
        this.latestDatabaseOrderbookId = snapshot.latestDatabaseOrderbookId;
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
    }
};
Progress = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vmctx))
], Progress);
exports.Progress = Progress;
//# sourceMappingURL=progress.js.map