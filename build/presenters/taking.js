"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taking = void 0;
const interfaces_1 = require("../interfaces");
const big_math_1 = require("../big-math");
const big_js_1 = require("big.js");
class Taking {
    constructor(hub) {
        this.hub = hub;
    }
    /**
     * @param taker variable
     */
    orderTakes(taker) {
        const { margin, assets, progress, book } = this.hub.models;
        const { config, calculation, timeline } = this.hub.context;
        const orderbook = book.getBook();
        const trades = [];
        let volume = new big_js_1.Big(0);
        let dollarVolume = new big_js_1.Big(0);
        for (const maker of orderbook[-taker.side])
            if ((taker.side === interfaces_1.Side.BID && taker.price.gte(maker.price) ||
                taker.side === interfaces_1.Side.ASK && taker.price.lte(maker.price)) && taker.unfilled.gt(0)) {
                const quantity = (0, big_math_1.min)(taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(calculation.dollarVolume(maker.price, quantity))
                    .round(config.CURRENCY_DP);
                trades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }
        assets.payFee(dollarVolume
            .times(config.TAKER_FEE_RATE)
            .round(config.CURRENCY_DP, 3 /* RoundUp */));
        // margin before position
        if (taker.operation === interfaces_1.Operation.OPEN) {
            margin.incMargin(taker.length, volume, dollarVolume);
            assets.openPosition(taker.length, volume, dollarVolume);
        }
        else {
            margin.decMargin(taker.length, volume, dollarVolume);
            assets.closePosition(taker.length, volume, dollarVolume);
        }
        return trades;
    }
}
exports.Taking = Taking;
//# sourceMappingURL=taking.js.map