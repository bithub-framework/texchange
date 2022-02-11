"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = void 0;
const big_js_1 = require("big.js");
const coroutine_locks_1 = require("coroutine-locks");
class DefaultMtm {
    constructor(hub) {
        this.hub = hub;
        this.mutex = new coroutine_locks_1.Mutex();
        this.mutex.lock();
    }
    async _start() {
        await this.mutex.lock();
    }
    async _stop() { }
    updateTrades(trades) {
        this.markPrice = trades[trades.length - 1].price;
        this.hub.presenters.clearing.settle();
        this.mutex.unlock();
    }
    getSettlementPrice() {
        return this.markPrice;
    }
    capture() {
        return this.markPrice;
    }
    restore(snapshot) {
        this.markPrice = new big_js_1.default(snapshot);
        this.mutex.unlock();
    }
}
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=mtm.js.map