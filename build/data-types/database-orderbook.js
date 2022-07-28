"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookFactory = void 0;
const secretary_like_1 = require("secretary-like");
class DatabaseOrderbookFactory {
    constructor(orderbookFactory) {
        this.orderbookFactory = orderbookFactory;
    }
    copy(databaseOrderbook) {
        const orderbook = this.orderbookFactory.copy(databaseOrderbook);
        return {
            [secretary_like_1.Side.BID]: orderbook[secretary_like_1.Side.BID],
            [secretary_like_1.Side.ASK]: orderbook[secretary_like_1.Side.ASK],
            time: orderbook.time,
            id: databaseOrderbook.id,
        };
    }
}
exports.DatabaseOrderbookFactory = DatabaseOrderbookFactory;
//# sourceMappingURL=database-orderbook.js.map