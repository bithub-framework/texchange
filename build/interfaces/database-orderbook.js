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
class DatabaseOrderbookStatic {
    constructor(H) {
        this.H = H;
        this.Orderbook = new secretary_like_1.OrderbookStatic(this.H);
    }
    copy(databaseOrderbook) {
        const orderbook = this.Orderbook.copy(databaseOrderbook);
        return new DatabaseOrderbook(orderbook.get(secretary_like_1.Side.BID), orderbook.get(secretary_like_1.Side.ASK), orderbook.time, databaseOrderbook.id);
    }
}
exports.DatabaseOrderbookStatic = DatabaseOrderbookStatic;
//# sourceMappingURL=database-orderbook.js.map