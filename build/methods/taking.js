"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsTaking = void 0;
const interfaces_1 = require("../interfaces");
const big_math_1 = require("../big-math");
const big_js_1 = require("big.js");
class MethodsTaking {
    constructor(core) {
        this.core = core;
    }
    orderTakes(taker) {
        const trades = [];
        let volume = new big_js_1.Big(0);
        let dollarVolume = new big_js_1.Big(0);
        const orderbook = this.core.states.orderbook.getBook();
        for (const maker of orderbook[-taker.side])
            if ((taker.side === interfaces_1.Side.BID && taker.price.gte(maker.price) ||
                taker.side === interfaces_1.Side.ASK && taker.price.lte(maker.price)) && taker.unfilled.gt(0)) {
                const quantity = big_math_1.min(taker.unfilled, maker.quantity);
                trades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.core.timeline.now(),
                    id: ++this.core.states.misc.userTradeCount,
                });
                this.core.states.orderbook.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.core.calculation.dollarVolume(maker.price, quantity))
                    .round(this.core.config.CURRENCY_DP);
            }
        this.core.states.orderbook.apply();
        const takerFee = dollarVolume.times(this.core.config.TAKER_FEE_RATE)
            .round(this.core.config.CURRENCY_DP, 3 /* RoundUp */);
        if (taker.operation === interfaces_1.Operation.OPEN) {
            this.core.states.margin[taker.length] = this.core.states.margin[taker.length]
                .plus(this.core.calculation.marginIncrement(taker, volume, dollarVolume).round(this.core.config.CURRENCY_DP));
            this.core.states.assets.openPosition(taker.length, volume, dollarVolume, takerFee);
        }
        else {
            this.core.states.margin[taker.length] = this.core.states.margin[taker.length]
                .minus(this.core.calculation.marginDecrement(taker, volume, dollarVolume).round(this.core.config.CURRENCY_DP));
            this.core.states.assets.closePosition(taker.length, volume, dollarVolume, takerFee);
        }
        return trades;
    }
}
exports.MethodsTaking = MethodsTaking;
//# sourceMappingURL=taking.js.map