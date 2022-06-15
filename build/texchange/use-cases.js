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
exports.UseCases = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCases = class UseCases {
    constructor(makeOrder, cancelOrder, amendOrder, getOpenOrders, getPositions, getBalances, updateOrderbook, subscription, getProgress, updateTrades) {
        this.makeOrder = makeOrder;
        this.cancelOrder = cancelOrder;
        this.amendOrder = amendOrder;
        this.getOpenOrders = getOpenOrders;
        this.getPositions = getPositions;
        this.getBalances = getBalances;
        this.updateOrderbook = updateOrderbook;
        this.subscription = subscription;
        this.getProgress = getProgress;
        this.updateTrades = updateTrades;
    }
};
UseCases = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.makeOrder)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.cancelOrder)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.amendOrder)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getOpenOrders)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getPositions)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getBalances)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.updateOrderbook)),
    __param(7, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.subscription)),
    __param(8, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getProgress)),
    __param(9, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.updateTrades))
], UseCases);
exports.UseCases = UseCases;
//# sourceMappingURL=use-cases.js.map