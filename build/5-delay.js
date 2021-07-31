"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_assets_1 = require("./4-assets");
const interfaces_1 = require("./interfaces");
class Texchange extends _4_assets_1.Texchange {
    constructor(config, snapshot, sleep, now) {
        super(config, snapshot, now);
        this.sleep = sleep;
    }
    async makeOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.makeOrders(orders);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.amendOrders(amendments);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.cancelOrders(orders);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getBalances();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getPositions();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getOpenOrders();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    /** @override */
    async pushOrderbook() {
        const orderbook = interfaces_1.clone(this.bookManager.getBook());
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }
    /** @override */
    async pushUTrades(uTrades) {
        const trades = interfaces_1.clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
    }
    /** @override */
    async pushPositionsAndBalances() {
        this.settle();
        const positions = interfaces_1.clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
        const balances = interfaces_1.clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=5-delay.js.map