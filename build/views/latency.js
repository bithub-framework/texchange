"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latency = void 0;
const events_1 = require("events");
class Latency extends events_1.EventEmitter {
    constructor(context, instant) {
        super();
        this.context = context;
        this.instant = instant;
        this.instant.on('orderbook', async (orderbook) => {
            try {
                await this.context.timeline.sleep(this.context.config.PROCESSING);
                await this.context.timeline.sleep(this.context.config.PING);
                this.emit('orderbook', orderbook);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.instant.on('trades', async (trades) => {
            try {
                await this.context.timeline.sleep(this.context.config.PROCESSING);
                await this.context.timeline.sleep(this.context.config.PING);
                this.emit('trades', trades);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.instant.on('positions', async (positions) => {
            try {
                await this.context.timeline.sleep(this.context.config.PROCESSING);
                await this.context.timeline.sleep(this.context.config.PING);
                this.emit('positions', positions);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.instant.on('balances', async (balances) => {
            try {
                await this.context.timeline.sleep(this.context.config.PROCESSING);
                await this.context.timeline.sleep(this.context.config.PING);
                this.emit('balances', balances);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
    }
    async makeOrders(orders) {
        try {
            await this.context.timeline.sleep(this.context.config.PING);
            await this.context.timeline.sleep(this.context.config.PROCESSING);
            return this.instant.makeOrders(orders);
        }
        finally {
            await this.context.timeline.sleep(this.context.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.context.timeline.sleep(this.context.config.PING);
            await this.context.timeline.sleep(this.context.config.PROCESSING);
            return this.instant.amendOrders(amendments);
        }
        finally {
            await this.context.timeline.sleep(this.context.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.context.timeline.sleep(this.context.config.PING);
            await this.context.timeline.sleep(this.context.config.PROCESSING);
            return this.instant.cancelOrders(orders);
        }
        finally {
            await this.context.timeline.sleep(this.context.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.context.timeline.sleep(this.context.config.PING);
            await this.context.timeline.sleep(this.context.config.PROCESSING);
            return this.instant.getBalances();
        }
        finally {
            await this.context.timeline.sleep(this.context.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.context.timeline.sleep(this.context.config.PING);
            await this.context.timeline.sleep(this.context.config.PROCESSING);
            return this.instant.getPositions();
        }
        finally {
            await this.context.timeline.sleep(this.context.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.context.timeline.sleep(this.context.config.PING);
            await this.context.timeline.sleep(this.context.config.PROCESSING);
            return this.instant.getOpenOrders();
        }
        finally {
            await this.context.timeline.sleep(this.context.config.PING);
        }
    }
}
exports.Latency = Latency;
//# sourceMappingURL=latency.js.map