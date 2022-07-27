"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalUnfilledFactory = exports.TotalUnfilled = void 0;
const secretary_like_1 = require("secretary-like");
class TotalUnfilled extends secretary_like_1.SidePair {
}
exports.TotalUnfilled = TotalUnfilled;
class TotalUnfilledFactory {
    copy(totalUnfilled) {
        return new TotalUnfilled(totalUnfilled.get(secretary_like_1.Side.BID), totalUnfilled.get(secretary_like_1.Side.ASK));
    }
}
exports.TotalUnfilledFactory = TotalUnfilledFactory;
//# sourceMappingURL=total-unfilled.js.map