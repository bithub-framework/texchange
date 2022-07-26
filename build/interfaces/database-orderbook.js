"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookStatic = exports.DatabaseOrderbook = void 0;
const secretary_like_1 = require("secretary-like");
class DatabaseOrderbook extends secretary_like_1.Orderbook {
    constructor(bids, asks, time, id) {
        super(bids, asks, time);
        this.id = id;
    }
}
exports.DatabaseOrderbook = DatabaseOrderbook;
class DatabaseOrderbookStatic extends secretary_like_1.OrderbookStatic {
    copyDatabaseOrderbook(databaseOrderbook) {
        const orderbook = this.copyOrderbook(databaseOrderbook);
        return new DatabaseOrderbook(orderbook.get(secretary_like_1.Side.BID), orderbook.get(secretary_like_1.Side.ASK), orderbook.time, databaseOrderbook.id);
    }
}
exports.DatabaseOrderbookStatic = DatabaseOrderbookStatic;
//# sourceMappingURL=database-orderbook.js.map