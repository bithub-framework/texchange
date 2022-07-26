"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostStatic = exports.Cost = void 0;
const secretary_like_1 = require("secretary-like");
class Cost {
    constructor(long, short) {
        this.long = long;
        this.short = short;
    }
    get(length) {
        if (length === secretary_like_1.Length.LONG)
            return this.long;
        else
            return this.short;
    }
    set(length, cost) {
        if (length === secretary_like_1.Length.LONG)
            this.long = cost;
        else
            this.short = cost;
    }
}
exports.Cost = Cost;
class CostStatic {
    constructor(H) {
        this.H = H;
    }
    capture(cost) {
        return {
            long: this.H.capture(cost.get(secretary_like_1.Length.LONG)),
            short: this.H.capture(cost.get(secretary_like_1.Length.SHORT)),
        };
    }
    restore(snapshot) {
        return new Cost(this.H.restore(snapshot.long), this.H.restore(snapshot.short));
    }
    copy(cost) {
        return new Cost(cost.get(secretary_like_1.Length.LONG), cost.get(secretary_like_1.Length.SHORT));
    }
}
exports.CostStatic = CostStatic;
//# sourceMappingURL=cost.js.map