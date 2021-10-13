"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMtm = void 0;
const big_js_1 = require("big.js");
const startable_1 = require("startable");
const coroutine_locks_1 = require("coroutine-locks");
class StateMtm extends startable_1.Startable {
    constructor(core, snapshot) {
        super();
        this.core = core;
        this.mutex = new coroutine_locks_1.Mutex();
        if (snapshot)
            this.markPrice = new big_js_1.default(snapshot);
        else
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
    updateOrderbook(orderbook) { }
    getSettlementPrice() {
        return this.markPrice;
    }
    capture() {
        return this.markPrice;
    }
}
exports.StateMtm = StateMtm;
//# sourceMappingURL=mtm.js.map