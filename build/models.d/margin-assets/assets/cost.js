"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostFactory = exports.Cost = void 0;
const secretary_like_1 = require("secretary-like");
class Cost extends secretary_like_1.LengthPair {
}
exports.Cost = Cost;
class CostFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(cost) {
        return {
            long: this.hFactory.capture(cost.get(secretary_like_1.Length.LONG)),
            short: this.hFactory.capture(cost.get(secretary_like_1.Length.SHORT)),
        };
    }
    restore(snapshot) {
        return new Cost(this.hFactory.restore(snapshot.long), this.hFactory.restore(snapshot.short));
    }
    copy(cost) {
        return new Cost(cost.get(secretary_like_1.Length.LONG), cost.get(secretary_like_1.Length.SHORT));
    }
}
exports.CostFactory = CostFactory;
//# sourceMappingURL=cost.js.map