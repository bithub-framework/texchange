"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeTakesOpenMakers = void 0;
const interfaces_1 = require("interfaces");
const interfaces_2 = require("../../interfaces");
class TradeTakesOpenMakers {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.TradeId = new interfaces_2.TradeIdStatic();
        this.Trade = new interfaces_2.TradeStatic(this.context.H, this.TradeId);
    }
    tradeTakesOpenMakers(trade) {
        const $trade = this.Trade.copy(trade);
        for (const order of [...this.models.makers])
            if (this.$tradeShouldTakeOpenOrder($trade, order)) {
                this.$tradeTakesOrderQueue($trade, order);
                this.tradeTakesOpenMaker($trade, order);
            }
    }
    $tradeShouldTakeOpenOrder($trade, maker) {
        return (maker.side === interfaces_1.Side.BID &&
            $trade.side === interfaces_1.Side.ASK &&
            $trade.price.lte(maker.price)
            ||
                maker.side === interfaces_1.Side.ASK &&
                    $trade.side === interfaces_1.Side.BID &&
                    $trade.price.gte(maker.price));
    }
    $tradeTakesOrderQueue($trade, maker) {
        const { makers } = this.models;
        if ($trade.price.eq(maker.price)) {
            const volume = this.context.H.min($trade.quantity, maker.behind);
            $trade.quantity = $trade.quantity.minus(volume);
            makers.takeOrderQueue(maker.id, volume);
        }
        else
            makers.takeOrderQueue(maker.id);
    }
    tradeTakesOpenMaker($trade, maker) {
        const { assets, makers } = this.models;
        const volume = this.context.H.min($trade.quantity, maker.unfilled);
        const dollarVolume = this.context.calc
            .dollarVolume(maker.price, volume)
            .round(this.context.config.market.CURRENCY_DP);
        $trade.quantity = $trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);
        assets.pay(dollarVolume
            .times(this.context.config.account.MAKER_FEE_RATE)
            .round(this.context.config.market.CURRENCY_DP, interfaces_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if (maker.operation === interfaces_1.Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: maker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: maker.length,
                volume,
                dollarVolume,
            });
    }
}
exports.TradeTakesOpenMakers = TradeTakesOpenMakers;
//# sourceMappingURL=trade-takes-open-makers.js.map