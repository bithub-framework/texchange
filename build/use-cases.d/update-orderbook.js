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
exports.UseCaseUpdateOrderbook = void 0;
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCaseUpdateOrderbook = class UseCaseUpdateOrderbook {
    constructor(vMCTX, book, progress, makers, broadcast, calculator, matcher) {
        this.vMCTX = vMCTX;
        this.book = book;
        this.progress = progress;
        this.makers = makers;
        this.broadcast = broadcast;
        this.calculator = calculator;
        this.matcher = matcher;
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.vMCTX.timeline.now());
        this.progress.updateDatabaseOrderbook(orderbook);
        this.book.setBasebook(orderbook);
        const orders = [...this.makers];
        for (const order of orders)
            this.makers.removeOrder(order.id);
        const allTrades = [];
        for (const order of orders) {
            const $order = this.vMCTX.DataTypes.openOrderFactory.new(order);
            const trades = this.matcher.$match($order);
            const maker = this.vMCTX.DataTypes.openOrderFactory.new($order);
            const behind = this.book.lineUp(maker);
            this.makers.appendOrder(maker, behind);
            allTrades.push(...trades);
        }
        if (allTrades.length) {
            this.broadcast.emit('trades', allTrades);
            this.broadcast.emit('balances', this.calculator.getBalances());
            this.broadcast.emit('positions', this.calculator.getPositions());
        }
        this.broadcast.emit('orderbook', this.book.getOrderbook());
    }
};
UseCaseUpdateOrderbook = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vMCTX)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.MODELS.book)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.progress)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.makers)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.broadcast)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.availableAssetsCalculator)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.matcher))
], UseCaseUpdateOrderbook);
exports.UseCaseUpdateOrderbook = UseCaseUpdateOrderbook;
//# sourceMappingURL=update-orderbook.js.map