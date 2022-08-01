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
exports.Matcher = void 0;
const secretary_like_1 = require("secretary-like");
const types_1 = require("../injection/types");
const injektor_1 = require("@zimtsui/injektor");
let Matcher = class Matcher {
    constructor(vMCTX, marketSpec, accountSpec, book, marginAssets, progress) {
        this.vMCTX = vMCTX;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.book = book;
        this.marginAssets = marginAssets;
        this.progress = progress;
    }
    $match($taker) {
        const orderbook = this.book.getOrderbook();
        const trades = [];
        let volume = this.vMCTX.DataTypes.hFactory.from(0);
        let dollarVolume = this.vMCTX.DataTypes.hFactory.from(0);
        for (const maker of orderbook[secretary_like_1.Side.invert($taker.side)])
            if (($taker.side === secretary_like_1.Side.BID && $taker.price.gte(maker.price) ||
                $taker.side === secretary_like_1.Side.ASK && $taker.price.lte(maker.price)) && $taker.unfilled.gt(0)) {
                const quantity = this.vMCTX.DataTypes.H.min($taker.unfilled, maker.quantity);
                this.book.decQuantity(maker.side, maker.price, quantity);
                $taker.filled = $taker.filled.plus(quantity);
                $taker.unfilled = $taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.marketSpec.dollarVolume(maker.price, quantity));
                trades.push(this.vMCTX.DataTypes.tradeFactory.create({
                    side: $taker.side,
                    price: maker.price,
                    quantity,
                    time: this.vMCTX.timeline.now(),
                    id: ++this.progress.userTradeCount,
                }));
            }
        this.marginAssets.pay(dollarVolume
            .times(this.accountSpec.TAKER_FEE_RATE)
            .round(this.marketSpec.CURRENCY_SCALE, secretary_like_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if ($taker.action === secretary_like_1.Action.OPEN)
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
};
Matcher = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vMCTX)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.book)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MODELS.marginAssets)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.MODELS.progress))
], Matcher);
exports.Matcher = Matcher;
//# sourceMappingURL=matcher.js.map