"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMisc = void 0;
const startable_1 = require("startable");
const coroutine_locks_1 = require("coroutine-locks");
class StateMisc extends startable_1.Startable {
    constructor(snapshotString) {
        super();
        this.mutex = new coroutine_locks_1.Mutex();
        this.userTradeCount = 0;
        this.userOrderCount = 0;
        if (snapshotString) {
            const snapshot = JSON.parse(snapshotString);
            this.latestPrice = snapshot.latestPrice;
            this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
            this.userTradeCount = snapshot.userTradeCount;
            this.userOrderCount = snapshot.userOrderCount;
        }
        else
            this.mutex.lock();
    }
    async _start() {
        await this.mutex.lock();
    }
    async _stop() { }
    updateDatabaseTrade(trade) {
        this.latestDatabaseTradeId = trade.id;
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }
    capture() {
        return {
            latestPrice: this.latestPrice,
            latestDatabaseTradeId: this.latestDatabaseTradeId,
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }
}
exports.StateMisc = StateMisc;
//# sourceMappingURL=misc.js.map