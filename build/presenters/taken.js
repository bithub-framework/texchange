"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taken = void 0;
const interfaces_1 = require("../interfaces");
const big_math_1 = require("../big-math");
const big_js_1 = require("big.js");
class Taken {
    constructor(hub) {
        this.hub = hub;
    }
    tradeTakesOpenMakers(trade) {
        trade = {
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
            id: trade.id,
        };
        for (const order of [...this.hub.models.makers.values()])
            if (this.tradeShouldTakeOpenOrder(trade, order)) {
                this.tradeTakesOrderQueue(trade, order);
                this.tradeTakesOpenMaker(trade, order);
            }
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
    /**
     * @param trade variable
     * @param maker variable
     */
    tradeTakesOrderQueue(trade, maker) {
        if (trade.price.eq(maker.price)) {
            const volume = (0, big_math_1.min)(trade.quantity, maker.behind);
            trade.quantity = trade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        }
        else
            maker.behind = new big_js_1.Big(0);
    }
    /**
     * @param trade variable
     * @param maker variable
     */
    tradeTakesOpenMaker(trade, maker) {
        const { assets, margin, makers } = this.hub.models;
        const volume = (0, big_math_1.min)(trade.quantity, maker.unfilled);
        const dollarVolume = this.hub.context.calculation
            .dollarVolume(maker.price, volume)
            .round(this.hub.context.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);
        assets.payFee(dollarVolume
            .times(this.hub.context.config.MAKER_FEE_RATE)
            .round(this.hub.context.config.CURRENCY_DP, 3 /* RoundUp */));
        // margin before position
        if (maker.operation === interfaces_1.Operation.OPEN) {
            margin.incMargin(maker.length, volume, dollarVolume);
            assets.openPosition(maker.length, volume, dollarVolume);
        }
        else {
            margin.decMargin(maker.length, volume, dollarVolume);
            assets.closePosition(maker.length, volume, dollarVolume);
        }
    }
}
exports.Taken = Taken;
//# sourceMappingURL=taken.js.map