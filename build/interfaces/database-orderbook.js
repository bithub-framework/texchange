"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookStatic = void 0;
const secretary_like_1 = require("secretary-like");
class DatabaseOrderbookStatic {
    constructor(H) {
        this.H = H;
        this.Orderbook = new secretary_like_1.OrderbookStatic(this.H);
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