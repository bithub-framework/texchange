"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostFactory = exports.Cost = void 0;
const secretary_like_1 = require("secretary-like");
class Cost {
}
exports.Cost = Cost;
class CostFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(cost) {
        return {
            long: this.hFactory.capture(cost[secretary_like_1.Length.LONG]),
            short: this.hFactory.capture(cost[secretary_like_1.Length.SHORT]),
        };
    }
    restore(snapshot) {
        return {
            [secretary_like_1.Length.LONG]: this.hFactory.restore(snapshot.long),
            [secretary_like_1.Length.SHORT]: this.hFactory.restore(snapshot.short),
        };
    }
    copy(cost) {
        return {
            [secretary_like_1.Length.LONG]: cost[secretary_like_1.Length.LONG],
            [secretary_like_1.Length.SHORT]: cost[secretary_like_1.Length.SHORT],
        };
    }
}
exports.CostFactory = CostFactory;
//# sourceMappingURL=cost.js.map