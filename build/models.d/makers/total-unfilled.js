"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalUnfilledStatic = exports.TotalUnfilled = void 0;
const secretary_like_1 = require("secretary-like");
class TotalUnfilled {
    constructor(bid, ask) {
        this.bid = bid;
        this.ask = ask;
    }
    get(side) {
        if (side === secretary_like_1.Side.BID)
            return this.bid;
        else
            return this.ask;
    }
    set(side, unfilled) {
        if (side === secretary_like_1.Side.BID)
            this.bid = unfilled;
        else
            this.ask = unfilled;
    }
}
exports.TotalUnfilled = TotalUnfilled;
class TotalUnfilledStatic {
    constructor(H) {
        this.H = H;
    }
    copy(totalUnfilled) {
        return new TotalUnfilled(totalUnfilled.get(secretary_like_1.Side.BID), totalUnfilled.get(secretary_like_1.Side.ASK));
    }
}
exports.TotalUnfilledStatic = TotalUnfilledStatic;
//# sourceMappingURL=total-unfilled.js.map