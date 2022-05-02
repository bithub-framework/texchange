"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketLatency = void 0;
const events_1 = require("events");
class MarketLatency {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
        this.events = new events_1.EventEmitter();
        this.spec = this.context.config.market;
        this.useCases.subscription.on('orderbook', async (orderbook) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('orderbook', this.context.Data.Orderbook.copy(orderbook));
            }
            catch (err) { }
        });
        this.useCases.subscription.on('trades', async (trades) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('trades', trades.map(trade => this.context.Data.Trade.copy(trade)));
            }
            catch (err) { }
        });
    }
    quantity(price, dollarVolume) {
        return this.context.calc.quantity(price, dollarVolume);
    }
    ;
    dollarVolume(price, quantity) {
        return this.context.calc.dollarVolume(price, quantity);
    }
}
exports.MarketLatency = MarketLatency;
//# sourceMappingURL=market.js.map