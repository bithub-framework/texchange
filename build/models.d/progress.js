"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
class Progress {
    constructor(context) {
        this.context = context;
        this.userTradeCount = 0;
        this.userOrderCount = 0;
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