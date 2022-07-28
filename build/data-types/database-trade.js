"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTradeFactory = void 0;
class DatabaseTradeFactory {
    constructor(tradeFactory) {
        this.tradeFactory = tradeFactory;
    }
    copy(trade) {
        return {
            ...this.tradeFactory.copy(trade),
            id: trade.id,
        };
    }
}
exports.DatabaseTradeFactory = DatabaseTradeFactory;
//# sourceMappingURL=database-trade.js.map