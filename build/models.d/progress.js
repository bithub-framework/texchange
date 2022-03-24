"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
class Progress {
    constructor(context) {
        this.context = context;
        // public latestPrice: H | null = null;
        // public latestDatabaseTradeTime: number | null = null;
        this.userTradeCount = 0;
        this.userOrderCount = 0;
    }
    updateDatabaseTrades(trades) {
        const now = this.context.timeline.now();
        // this.latestDatabaseTradeTime = now;
        // this.latestPrice = trades[trades.length - 1].price;
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