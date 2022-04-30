"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLatency = void 0;
const events_1 = require("events");
class AccountLatency {
    constructor(context, useCases, instant) {
        this.context = context;
        this.useCases = useCases;
        this.instant = instant;
        this.events = new events_1.EventEmitter();
        this.spec = this.context.config.account;
        this.useCases.subscription.on('positions', async (positions) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('positions', this.context.Data.Positions.copy(positions));
            }
            catch (err) {
                this.events.emit('error', err);
            }
        });
        this.useCases.subscription.on('balances', async (balances) => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('balances', this.context.Data.Balances.copy(balances));
            }
            catch (err) {
                this.events.emit('error', err);
            }
        });
    }
    async makeOrders($orders) {
        try {
            const orders = $orders.map(order => this.context.Data.LimitOrder.copy(order));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.makeOrders(orders).map(order => order instanceof Error
                ? order
                : this.context.Data.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async amendOrders($amendments) {
        try {
            const amendments = $amendments.map(amendment => this.context.Data.Amendment.copy(amendment));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.amendOrders(amendments).map(order => order instanceof Error
                ? order
                : this.context.Data.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async cancelOrders($orders) {
        try {
            const orders = $orders.map(order => this.context.Data.OpenOrder.copy(order));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.cancelOrders(orders).map(order => order instanceof Error
                ? order
                : this.context.Data.OpenOrder.copy(order));
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async getBalances() {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.context.Data.Balances.copy(this.instant.getBalances());
        }
        finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
    async getPositions() {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.context.Data.Positions.copy(this.instant.getPositions());
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
                : this.context.Data.OpenOrder.copy(order));
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
exports.AccountLatency = AccountLatency;
//# sourceMappingURL=account.js.map