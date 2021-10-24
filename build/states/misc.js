"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMisc = void 0;
const startable_1 = require("startable");
const assert = require("assert");
const big_js_1 = require("big.js");
const coroutine_locks_1 = require("coroutine-locks");
class StateMisc extends startable_1.Startable {
    constructor(core) {
        super();
        this.core = core;
        this.mutex = new coroutine_locks_1.Mutex();
        this.userTradeCount = 0;
        this.userOrderCount = 0;
        this.restored = false;
        this.mutex.lock();
    }
    async _start() {
        if (!this.restored)
            await this.mutex.lock();
    }
    async _stop() { }
    updateDatabaseTrade(trade) {
        this.latestDatabaseTradeId = trade.id;
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }
    capture() {
        assert(this.readyState === "STOPPED" /* STOPPED */ ||
            this.readyState === "STARTED" /* STARTED */);
        return {
            latestPrice: this.latestPrice,
            latestDatabaseTradeId: this.latestDatabaseTradeId,
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }
    restore(snapshot) {
        assert(this.readyState === "STOPPED" /* STOPPED */ ||
            this.readyState === "STARTED" /* STARTED */);
        this.restored = true;
        this.latestPrice = new big_js_1.default(snapshot.latestPrice);
        this.latestDatabaseTradeId = snapshot.latestDatabaseTradeId;
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}
exports.StateMisc = StateMisc;
//# sourceMappingURL=misc.js.map