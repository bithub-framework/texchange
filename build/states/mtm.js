"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMtm = void 0;
const big_js_1 = require("big.js");
const startable_1 = require("startable");
const coroutine_locks_1 = require("coroutine-locks");
class StateMtm extends startable_1.Startable {
    constructor(snapshot) {
        super();
        this.mutex = new coroutine_locks_1.Mutex();
        if (snapshot)
            this.latestPrice = new big_js_1.default(snapshot);
        else
            this.mutex.lock();
    }
    async _start() {
        await this.mutex.lock();
    }
    async _stop() { }
    updateTrade(trade) {
        this.latestPrice = trade.price;
        this.mutex.unlock();
    }
    getMarkPrice() {
        return this.latestPrice;
    }
    capture() {
        return this.latestPrice;
    }
}
exports.StateMtm = StateMtm;
//# sourceMappingURL=mtm.js.map