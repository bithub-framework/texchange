"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const events_1 = require("events");
const orderbook_manager_1 = require("./managers/orderbook-manager");
const interfaces_1 = require("./interfaces");
class Texchange extends events_1.EventEmitter {
    constructor(config, 
    /** 必须保证 update 时数据的 time 等于 now() */
    now) {
        super();
        this.config = config;
        this.now = now;
        this.tradeCount = 0;
        this.book = new orderbook_manager_1.OrderbookManager(config, now);
    }
    updateTrades(uTrades) {
        this.pushUTrades(uTrades);
    }
    pushUTrades(uTrades) {
        const trades = this.uTrade2Trade(uTrades);
        this.emit('trades', trades);
    }
    uTrade2Trade(uTrades) {
        return uTrades.map(uTrade => ({
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
            id: ++this.tradeCount,
        }));
    }
    updateOrderbook(orderbook) {
        this.book.setBase(orderbook);
        this.book.apply();
        this.pushOrderbook();
    }
    pushOrderbook() {
        this.emit('orderbook', interfaces_1.clone(this.book.getBook()));
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=1-pushing.js.map