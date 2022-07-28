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
exports.OrderValidator = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let OrderValidator = class OrderValidator {
    constructor(context, marketSpec, accountSpec, makers, calculator) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.makers = makers;
        this.calculator = calculator;
    }
    validateOrder(order) {
        this.validateFormat(order);
        this.validateQuantity(order);
    }
    validateQuantity(order) {
        const closable = this.calculator.getClosable();
        this.makers.appendOrder(order, this.context.dataTypes.hFactory.from(0));
        try {
            const enoughPosition = closable[secretary_like_1.Length.LONG].gte(0) &&
                closable[secretary_like_1.Length.SHORT].gte(0);
            assert(enoughPosition);
            const enoughBalance = this.calculator.getAvailable()
                .gte(this.marketSpec.dollarVolume(order.price, order.unfilled).times(Math.max(this.accountSpec.TAKER_FEE_RATE, 0)).round(this.marketSpec.CURRENCY_DP));
            try {
                assert(enoughBalance);
            }
            catch (err) {
                // // @ts-ignore
                // console.log(this.calculator.getAvailable().toJSON());
                throw err;
            }
        }
        finally {
            this.makers.removeOrder(order.id);
        }
    }
    validateFormat(order) {
        assert(order.price.eq(order.price.round(this.marketSpec.PRICE_DP)));
        assert(order.price.mod(this.marketSpec.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.marketSpec.QUANTITY_DP)));
        assert(order.length === secretary_like_1.Length.LONG || order.length === secretary_like_1.Length.SHORT);
        assert(order.action === secretary_like_1.Action.OPEN || order.action === secretary_like_1.Action.CLOSE);
        assert(secretary_like_1.Side.from(order.length, order.action) === order.side);
    }
};
OrderValidator = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.makers)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.availableAssetsCalculator))
], OrderValidator);
exports.OrderValidator = OrderValidator;
//# sourceMappingURL=order-validator.js.map