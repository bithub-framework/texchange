"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMtm = void 0;
const big_js_1 = require("big.js");
const startable_1 = require("startable");
const coroutine_locks_1 = require("coroutine-locks");
const assert = require("assert");
class StateMtm extends startable_1.Startable {
    constructor(core) {
        super();
        this.core = core;
        this.mutex = new coroutine_locks_1.Mutex();
        this.mutex.lock();
    }
    async _start() {
        await this.mutex.lock();
    }
    async _stop() { }
    updateTrades(trades) {
        this.markPrice = trades[trades.length - 1].price;
        this.core.clearing.settle();
        this.mutex.unlock();
    }
    getSettlementPrice() {
        assert(this.readyState === "STARTED" /* STARTED */);
        return this.markPrice;
    }
    capture() {
        assert(this.readyState === "STOPPED" /* STOPPED */ ||
            this.readyState === "STARTED" /* STARTED */);
        return this.markPrice;
    }
    restore(snapshot) {
        assert(this.readyState === "STOPPED" /* STOPPED */ ||
            this.readyState === "STARTED" /* STARTED */);
        this.markPrice = new big_js_1.default(snapshot);
        this.mutex.unlock();
    }
}
exports.StateMtm = StateMtm;
//# sourceMappingURL=mtm.js.map