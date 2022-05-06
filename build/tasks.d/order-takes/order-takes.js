"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTakes = void 0;
const secretary_like_1 = require("secretary-like");
class OrderTakes {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    $orderTakes($taker) {
        const { assets, progress, book } = this.models;
        const { config, timeline, calc } = this.context;
        const orderbook = book.getBook();
        const trades = [];
        let volume = new this.context.Data.H(0);
        let dollarVolume = new this.context.Data.H(0);
        for (const maker of orderbook[-$taker.side])
            if (($taker.side === secretary_like_1.Side.BID && $taker.price.gte(maker.price) ||
                $taker.side === secretary_like_1.Side.ASK && $taker.price.lte(maker.price)) && $taker.unfilled.gt(0)) {
                const quantity = this.context.Data.H.min($taker.unfilled, maker.quantity);
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
            .round(config.market.CURRENCY_DP, secretary_like_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if ($taker.operation === secretary_like_1.Operation.OPEN)
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
exports.OrderTakes = OrderTakes;
//# sourceMappingURL=order-takes.js.map