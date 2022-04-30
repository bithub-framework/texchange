"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTradeStatic = void 0;
const interfaces_1 = require("interfaces");
class DatabaseTradeStatic {
    constructor(H) {
        this.H = H;
        this.Trade = new interfaces_1.TradeStatic(this.H);
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