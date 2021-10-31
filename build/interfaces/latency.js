"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceLatency = void 0;
const events_1 = require("events");
class InterfaceLatency extends events_1.EventEmitter {
    constructor(core) {
        super();
        this.core = core;
        this.core.interfaces.instant.on('orderbook', async (orderbook) => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('orderbook', orderbook);
            }
            catch (err) {
                this.core.stop(err);
            }
        });
        this.core.interfaces.instant.on('trades', async (trades) => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('trades', trades);
            }
            catch (err) {
                this.core.stop(err);
            }
        });
        this.core.interfaces.instant.on('positions', async (positions) => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('positions', positions);
            }
            catch (err) {
                this.core.stop(err);
            }
        });
        this.core.interfaces.instant.on('balances', async (balances) => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('balances', balances);
            }
            catch (err) {
                this.core.stop(err);
            }
        });
    }
    async makeOrders(orders) {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.makeOrders(orders);
        }
        finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.amendOrders(amendments);
        }
        finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.cancelOrders(orders);
        }
        finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.getBalances();
        }
        finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.getPositions();
        }
        finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.getOpenOrders();
        }
        finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
}
exports.InterfaceLatency = InterfaceLatency;
//# sourceMappingURL=latency.js.map