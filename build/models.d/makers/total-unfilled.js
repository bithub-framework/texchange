"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalUnfilledFactory = exports.TotalUnfilled = void 0;
const secretary_like_1 = require("secretary-like");
class TotalUnfilled {
}
exports.TotalUnfilled = TotalUnfilled;
class TotalUnfilledFactory {
    copy(totalUnfilled) {
        return {
            [secretary_like_1.Side.BID]: totalUnfilled[secretary_like_1.Side.BID],
            [secretary_like_1.Side.ASK]: totalUnfilled[secretary_like_1.Side.ASK],
        };
    }
}
exports.TotalUnfilledFactory = TotalUnfilledFactory;
//# sourceMappingURL=total-unfilled.js.map