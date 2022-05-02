"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
class Progress {
    constructor(context) {
        this.context = context;
        this.userTradeCount = 0;
        this.userOrderCount = 0;
        this.latestDatabaseTradeId = null;
        this.latestDatabaseOrderbookId = null;
    }
    updateDatabaseTrades(trades) {
        this.latestDatabaseTradeId = trades[trades.length - 1].id;
    }
    getLatestDatabaseOrderbookId() {
        return this.latestDatabaseOrderbookId;
    }
    updateDatabaseOrderbook(orderbook) {
        this.latestDatabaseOrderbookId = orderbook.id;
    }
    getLatestDatabaseTradeId() {
        return this.latestDatabaseTradeId;
    }
    capture() {
        return {
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }
    restore(snapshot) {
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}
exports.Progress = Progress;
//# sourceMappingURL=progress.js.map