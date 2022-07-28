"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookFactory = exports.DatabaseOrderbook = void 0;
const secretary_like_1 = require("secretary-like");
class DatabaseOrderbook extends secretary_like_1.Orderbook {
    constructor(bids, asks, time, id) {
        super(bids, asks, time);
        this.id = id;
    }
}
exports.DatabaseOrderbook = DatabaseOrderbook;
class DatabaseOrderbookFactory {
    constructor(orderbookFactory) {
        this.orderbookFactory = orderbookFactory;
    }
    copy(databaseOrderbook) {
        const orderbook = this.orderbookFactory.copy(databaseOrderbook);
        return new DatabaseOrderbook(orderbook.get(secretary_like_1.Side.BID), orderbook.get(secretary_like_1.Side.ASK), orderbook.time, databaseOrderbook.id);
    }
}
exports.DatabaseOrderbookFactory = DatabaseOrderbookFactory;
//# sourceMappingURL=database-orderbook.js.map