"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taking = void 0;
const interfaces_1 = require("../interfaces");
const big_math_1 = require("../big-math");
const big_js_1 = require("big.js");
class Taking {
    constructor(context, models) {
        this.context = context;
        this.models = models;
        this.involved = [
            this.models.assets,
            this.models.margin,
            this.models.book,
            this.models.progress,
        ];
    }
    /**
     * @param taker variable
     */
    orderTakes(taker) {
        const { margin, assets, progress, book } = this.models;
        const { config, timeline } = this.context;
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
                    .plus(config.dollarVolume(maker.price, quantity))
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
        if (taker.operation === interfaces_1.Operation.OPEN) {
            margin.incMargin(taker.length, volume, dollarVolume);
            assets.openPosition(taker.length, volume, dollarVolume);
        }
        else {
            margin.decMargin(assets, taker.length, volume, dollarVolume);
            assets.closePosition(taker.length, volume, dollarVolume);
        }
        this.models.margin.stage = true;
        this.models.assets.stage = true;
        this.models.progress.stage = true;
        this.models.book.stage = true;
        return trades;
    }
}
exports.Taking = Taking;
//# sourceMappingURL=taking.js.map