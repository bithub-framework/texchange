"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTakes = void 0;
const interfaces_1 = require("interfaces");
const utilities_1 = require("../utilities");
const big_js_1 = require("big.js");
const task_1 = require("../task");
class OrderTakes extends task_1.Task {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    /**
     * @param taker variable
     */
    orderTakes(taker) {
        const { margins, assets, progress, book } = this.models;
        const { config, timeline } = this.context;
        const orderbook = book.getBook();
        const trades = [];
        let volume = new big_js_1.Big(0);
        let dollarVolume = new big_js_1.Big(0);
        for (const maker of orderbook[-taker.side])
            if ((taker.side === interfaces_1.Side.BID && taker.price.gte(maker.price) ||
                taker.side === interfaces_1.Side.ASK && taker.price.lte(maker.price)) && taker.unfilled.gt(0)) {
                const quantity = (0, utilities_1.min)(taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(config.market.dollarVolume(maker.price, quantity))
                    .round(config.market.CURRENCY_DP);
                trades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }
        assets.payFee(dollarVolume
            .times(config.account.TAKER_FEE_RATE)
            .round(config.market.CURRENCY_DP, 3 /* RoundUp */));
        if (taker.operation === interfaces_1.Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: taker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: taker.length,
                volume,
                dollarVolume,
            });
        return trades;
    }
}
exports.OrderTakes = OrderTakes;
//# sourceMappingURL=order-takes.js.map