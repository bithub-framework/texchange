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
exports.UseCaseAmendOrder = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCaseAmendOrder = class UseCaseAmendOrder {
    constructor(vMCTX, book, makers, validator, broadcast, calculator, matcher) {
        this.vMCTX = vMCTX;
        this.book = book;
        this.makers = makers;
        this.validator = validator;
        this.broadcast = broadcast;
        this.calculator = calculator;
        this.matcher = matcher;
    }
    amendOrder(amendment) {
        let filled;
        try {
            filled = this.makers.getOrder(amendment.id).filled;
            this.makers.forcedlyRemoveOrder(amendment.id);
        }
        catch (err) {
            filled = amendment.quantity;
        }
        const order = this.vMCTX.DataTypes.openOrderFactory.new({
            ...amendment,
            filled,
            price: amendment.newPrice,
            unfilled: amendment.newUnfilled,
            quantity: amendment.newUnfilled.plus(filled),
        });
        this.validator.validateOrder(order);
        const $order = this.vMCTX.DataTypes.openOrderFactory.new(order);
        const trades = this.matcher.$match($order);
        const maker = this.vMCTX.DataTypes.openOrderFactory.new($order);
        const behind = this.book.lineUp(maker);
        this.makers.appendOrder(maker, behind);
        if (trades.length) {
            this.broadcast.emit('trades', trades);
            this.broadcast.emit('orderbook', this.book.getOrderbook());
            this.broadcast.emit('balances', this.calculator.getBalances());
            this.broadcast.emit('positions', this.calculator.getPositions());
        }
        return maker;
    }
};
UseCaseAmendOrder = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vMCTX)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.MODELS.book)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.makers)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.orderValidator)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.broadcast)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.availableAssetsCalculator)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.matcher))
], UseCaseAmendOrder);
exports.UseCaseAmendOrder = UseCaseAmendOrder;
//# sourceMappingURL=amend-order.js.map