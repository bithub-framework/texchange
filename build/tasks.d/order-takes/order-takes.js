"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTakes = void 0;
const interfaces_1 = require("interfaces");
const utilities_1 = require("../../utilities");
class OrderTakes {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
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
                const quantity = (0, utilities_1.min)($taker.unfilled, maker.quantity);
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
exports.OrderTakes = OrderTakes;
//# sourceMappingURL=order-takes.js.map