"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookStatic = void 0;
const interfaces_1 = require("interfaces");
class DatabaseOrderbookStatic {
    constructor(H) {
        this.H = H;
        this.Orderbook = new interfaces_1.OrderbookStatic(this.H);
    }
    copy(orderbook) {
        return {
            ...this.Orderbook.copy(orderbook),
            id: orderbook.id,
        };
    }
}
exports.DatabaseOrderbookStatic = DatabaseOrderbookStatic;
//# sourceMappingURL=database-orderbook.js.map