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
exports.DatabaseTradeHandler = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let DatabaseTradeHandler = class DatabaseTradeHandler {
    constructor(context, marketSpec, accountSpec, marginAssets, makers) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.marginAssets = marginAssets;
        this.makers = makers;
    }
    tradeTakesOpenMakers(trade) {
        const $trade = this.context.dataTypes.tradeFactory.copy(trade);
        for (const order of [...this.makers])
            if (this.$tradeShouldTakeOpenOrder($trade, order)) {
                this.$tradeTakesOrderQueue($trade, order);
                this.$tradeTakesOpenMaker($trade, order);
            }
    }
    $tradeShouldTakeOpenOrder($trade, maker) {
        return (maker.side === secretary_like_1.Side.BID &&
            $trade.side === secretary_like_1.Side.ASK &&
            $trade.price.lte(maker.price)
            ||
                maker.side === secretary_like_1.Side.ASK &&
                    $trade.side === secretary_like_1.Side.BID &&
                    $trade.price.gte(maker.price));
    }
    $tradeTakesOrderQueue($trade, maker) {
        if ($trade.price.eq(maker.price)) {
            const volume = this.context.dataTypes.H.min($trade.quantity, maker.behind);
            $trade.quantity = $trade.quantity.minus(volume);
            this.makers.takeOrderQueue(maker.id, volume);
        }
        else
            this.makers.takeOrderQueue(maker.id);
    }
    $tradeTakesOpenMaker($trade, maker) {
        const volume = this.context.dataTypes.H.min($trade.quantity, maker.unfilled);
        const dollarVolume = this.marketSpec
            .dollarVolume(maker.price, volume);
        $trade.quantity = $trade.quantity.minus(volume);
        this.makers.takeOrder(maker.id, volume);
        this.marginAssets.pay(dollarVolume
            .times(this.accountSpec.MAKER_FEE_RATE)
            .round(this.marketSpec.CURRENCY_DP, secretary_like_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if (maker.action === secretary_like_1.Action.OPEN)
            this.marginAssets.open({
                length: maker.length,
                volume,
                dollarVolume,
            });
        else
            this.marginAssets.close({
                length: maker.length,
                volume,
                dollarVolume,
            });
    }
};
DatabaseTradeHandler = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.marginAssets)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MODELS.makers))
], DatabaseTradeHandler);
exports.DatabaseTradeHandler = DatabaseTradeHandler;
//# sourceMappingURL=database-trade-handler.js.map