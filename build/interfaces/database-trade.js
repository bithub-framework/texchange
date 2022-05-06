"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTradeStatic = void 0;
const secretary_like_1 = require("secretary-like");
class DatabaseTradeStatic {
    constructor(H) {
        this.H = H;
        this.Trade = new secretary_like_1.TradeStatic(this.H);
    }
    copy(trade) {
        return {
            ...this.Trade.copy(trade),
            id: trade.id,
        };
    }
}
exports.DatabaseTradeStatic = DatabaseTradeStatic;
//# sourceMappingURL=database-trade.js.map