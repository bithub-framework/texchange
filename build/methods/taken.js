"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsTaken = void 0;
const interfaces_1 = require("../interfaces");
const big_math_1 = require("../big-math");
const big_js_1 = require("big.js");
class MethodsTaken {
    constructor(core) {
        this.core = core;
    }
    tradeShouldTakeOpenOrder(trade, maker) {
        return (maker.side === interfaces_1.Side.BID &&
            trade.side === interfaces_1.Side.ASK &&
            trade.price.lte(maker.price)
            ||
                maker.side === interfaces_1.Side.ASK &&
                    trade.side === interfaces_1.Side.BID &&
                    trade.price.gte(maker.price));
    }
    tradeTakesOrderQueue(trade, maker) {
        if (trade.price.eq(maker.price)) {
            const volume = big_math_1.min(trade.quantity, maker.behind);
            trade.quantity = trade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        }
        else
            maker.behind = new big_js_1.Big(0);
    }
    tradeTakesOpenMaker(trade, maker) {
        const volume = big_math_1.min(trade.quantity, maker.unfilled);
        const dollarVolume = this.core.calculation.dollarVolume(maker.price, volume)
            .round(this.core.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        const toThaw = this.core.states.makers.takeOrder(maker.id, volume, dollarVolume);
        this.core.states.margin.thaw(toThaw);
        const makerFee = dollarVolume.times(this.core.config.MAKER_FEE_RATE)
            .round(this.core.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === interfaces_1.Operation.OPEN) {
            this.core.states.margin[maker.length] = this.core.states.margin[maker.length]
                .plus(this.core.calculation.marginIncrement(maker.length, volume, dollarVolume).round(this.core.config.CURRENCY_DP));
            this.core.states.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
        }
        else {
            this.core.states.margin[maker.length] = this.core.states.margin[maker.length]
                .minus(this.core.calculation.marginDecrement(maker.length, volume, dollarVolume).round(this.core.config.CURRENCY_DP));
            this.core.states.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
        }
        return volume;
    }
    tradeTakesOpenMakers(trade) {
        trade = {
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
            id: trade.id,
        };
        let totalVolume = new big_js_1.Big(0);
        for (const order of [...this.core.states.makers.values()])
            if (this.tradeShouldTakeOpenOrder(trade, order)) {
                this.tradeTakesOrderQueue(trade, order);
                const volume = this.tradeTakesOpenMaker(trade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }
}
exports.MethodsTaken = MethodsTaken;
//# sourceMappingURL=taken.js.map