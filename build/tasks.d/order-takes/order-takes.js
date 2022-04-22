"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTakes = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("interfaces");
class OrderTakes {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    $orderTakes($taker) {
        const { assets, progress, book } = this.models;
        const { config, timeline, calc } = this.context;
        const orderbook = book.getBook();
        const trades = [];
        let volume = this.context.H.from(0);
        let dollarVolume = this.context.H.from(0);
        for (const maker of orderbook[-$taker.side])
            if (($taker.side === interfaces_1.Side.BID && $taker.price.gte(maker.price) ||
                $taker.side === interfaces_1.Side.ASK && $taker.price.lte(maker.price)) && $taker.unfilled.gt(0)) {
                const quantity = this.context.H.min($taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                $taker.filled = $taker.filled.plus(quantity);
                $taker.unfilled = $taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(calc.dollarVolume(maker.price, quantity))
                    .round(config.market.CURRENCY_DP);
                trades.push({
                    side: $taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }
        assets.pay(dollarVolume
            .times(config.account.TAKER_FEE_RATE)
            .round(config.market.CURRENCY_DP, interfaces_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if ($taker.operation === interfaces_1.Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        return trades;
    }
}
OrderTakes.TaskDeps = {};
__decorate([
    (0, injektor_1.instantInject)(OrderTakes.TaskDeps)
], OrderTakes.prototype, "tasks", void 0);
exports.OrderTakes = OrderTakes;
//# sourceMappingURL=order-takes.js.map