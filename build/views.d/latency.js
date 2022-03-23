"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latency = void 0;
const interfaces_1 = require("interfaces");
const events_1 = require("events");
class Latency {
    constructor(context, useCases, instant) {
        this.context = context;
        this.useCases = useCases;
        this.instant = instant;
        this.events = new events_1.EventEmitter();
        this.Orderbook = new interfaces_1.OrderbookStatic(this.context.H);
        this.TradeId = new interfaces_1.TexchangeTradeIdStatic();
        this.Trade = new interfaces_1.TradeStatic(this.context.H, this.TradeId);
        this.Positions = new interfaces_1.PositionsStatic(this.context.H);
        this.Balances = new interfaces_1.BalancesStatic(this.context.H);
        this.LimitOrder = new interfaces_1.LimitOrderStatic(this.context.H);
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.Amendment = new interfaces_1.TexchangeAmendmentStatic(this.context.H, this.OrderId);
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
        this.useCases.subscription.on('orderbook', async (orderbook) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('orderbook', this.Orderbook.copy(orderbook));
            }
            catch (err) {
                this.events.emit('error', err);
            }
        });
        this.useCases.subscription.on('trades', async (trades) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('trades', trades.map(trade => this.Trade.copy(trade)));
            }
            catch (err) {
                this.events.emit('error', err);
            }
        });
        this.useCases.subscription.on('positions', async (positions) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('positions', this.Positions.copy(positions));
            }
            catch (err) {
                this.events.emit('error', err);
            }
        });
        this.useCases.subscription.on('balances', async (balances) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('balances', this.Balances.copy(balances));
            }
            catch (err) {
                this.events.emit('error', err);
            }
        });
    }
    async makeOrders(orders) {
        try {
            orders = orders.map(order => this.LimitOrder.copy(order));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.makeOrders(orders).map(order => order instanceof Error
                ? order
                : this.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            amendments = amendments.map(amendment => this.Amendment.copy(amendment));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.amendOrders(amendments).map(order => order instanceof Error
                ? order
                : this.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.cancelOrders(orders).map(order => order instanceof Error
                ? order
                : this.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async getBalances() {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.Balances.copy(this.instant.getBalances());
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async getPositions() {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.Positions.copy(this.instant.getPositions());
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getOpenOrders().map(order => order instanceof Error
                ? order
                : this.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    quantity(price, dollarVolume) {
        return this.context.calc.quantity(price, dollarVolume);
    }
    ;
    dollarVolume(price, quantity) {
        return this.context.calc.dollarVolume(price, quantity);
    }
}
exports.Latency = Latency;
//# sourceMappingURL=latency.js.map