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
exports.UserOrderHandler = void 0;
const secretary_like_1 = require("secretary-like");
const types_1 = require("../injection/types");
const injektor_1 = require("@zimtsui/injektor");
let UserOrderHandler = class UserOrderHandler {
    constructor(context, marketSpec, accountSpec, book, marginAssets, progress, makers, broadcast, calculator, validator) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.book = book;
        this.marginAssets = marginAssets;
        this.progress = progress;
        this.makers = makers;
        this.broadcast = broadcast;
        this.calculator = calculator;
        this.validator = validator;
    }
    makeOpenOrder(order) {
        this.validator.validateOrder(order);
        const $order = this.context.Data.OpenOrder.copy(order);
        const trades = this.$orderTakes($order);
        this.orderMakes($order);
        if (trades.length) {
            this.broadcast.emit('trades', trades);
            this.broadcast.emit('orderbook', this.book.getBook());
            this.broadcast.emit('balances', this.calculator.getBalances());
            this.broadcast.emit('positions', this.calculator.getPositions());
        }
        return $order;
    }
    $orderTakes($taker) {
        const orderbook = this.book.getBook();
        const trades = [];
        let volume = new this.context.Data.H(0);
        let dollarVolume = new this.context.Data.H(0);
        for (const maker of orderbook[-$taker.side])
            if (($taker.side === secretary_like_1.Side.BID && $taker.price.gte(maker.price) ||
                $taker.side === secretary_like_1.Side.ASK && $taker.price.lte(maker.price)) && $taker.unfilled.gt(0)) {
                const quantity = this.context.Data.H.min($taker.unfilled, maker.quantity);
                this.book.decQuantity(maker.side, maker.price, quantity);
                $taker.filled = $taker.filled.plus(quantity);
                $taker.unfilled = $taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.marketSpec.dollarVolume(maker.price, quantity))
                    .round(this.marketSpec.CURRENCY_DP);
                trades.push({
                    side: $taker.side,
                    price: maker.price,
                    quantity,
                    time: this.context.timeline.now(),
                    id: ++this.progress.userTradeCount,
                });
            }
        this.marginAssets.pay(dollarVolume
            .times(this.accountSpec.TAKER_FEE_RATE)
            .round(this.marketSpec.CURRENCY_DP, secretary_like_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if ($taker.operation === secretary_like_1.Operation.OPEN)
            this.marginAssets.open({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        else
            this.marginAssets.close({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        return trades;
    }
    orderMakes(order) {
        const makers = this.book.getBook()[order.side];
        let behind = new this.context.Data.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        this.makers.appendOrder(order, behind);
    }
    cancelOpenOrder(order) {
        let filled;
        try {
            filled = this.makers.getOrder(order.id).filled;
            this.makers.forcedlyRemoveOrder(order.id);
        }
        catch (err) {
            filled = order.quantity;
        }
        return {
            ...order,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
};
UserOrderHandler = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.book)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MODELS.marginAssets)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.MODELS.progress)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.MODELS.makers)),
    __param(7, (0, injektor_1.inject)(types_1.TYPES.broadcast)),
    __param(8, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.availableAssetsCalculator)),
    __param(9, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.orderValidator))
], UserOrderHandler);
exports.UserOrderHandler = UserOrderHandler;
//# sourceMappingURL=user-order-handler.js.map