"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latency = void 0;
const events_1 = require("events");
class Latency extends events_1.EventEmitter {
    constructor(hub) {
        super();
        this.hub = hub;
        this.hub.views.instant.on('orderbook', async (orderbook) => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('orderbook', orderbook);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.hub.views.instant.on('trades', async (trades) => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('trades', trades);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.hub.views.instant.on('positions', async (positions) => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('positions', positions);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.hub.views.instant.on('balances', async (balances) => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('balances', balances);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
    }
    async makeOrders(orders) {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.makeOrders(orders);
        }
        finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.amendOrders(amendments);
        }
        finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.cancelOrders(orders);
        }
        finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.getBalances();
        }
        finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.getPositions();
        }
        finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.getOpenOrders();
        }
        finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
}
exports.Latency = Latency;
//# sourceMappingURL=latency.js.map