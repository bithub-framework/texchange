"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const big_js_1 = require("big.js");
const coroutine_locks_1 = require("coroutine-locks");
// TODO initial state
class Progress {
    constructor(hub) {
        this.hub = hub;
        this.mutex = new coroutine_locks_1.Mutex();
        this.userTradeCount = 0;
        this.userOrderCount = 0;
    }
    async StatefulStartable$start() {
        await this.mutex.lock();
    }
    async StatefulStartable$stop() { }
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
    restore(snapshot) {
        this.latestPrice = new big_js_1.default(snapshot.latestPrice);
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
        this.userTradeCount = snapshot.userTradeCount;
        // this.userOrderCount = snapshot.userOrderCount!;
    }
}
exports.Progress = Progress;
//# sourceMappingURL=progress.js.map