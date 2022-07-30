"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = void 0;
const secretary_like_1 = require("secretary-like");
class BalanceFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    new(source) {
        return source;
    }
    capture(balance) {
        return {
            long: this.hFactory.capture(balance[secretary_like_1.Length.LONG]),
            short: this.hFactory.capture(balance[secretary_like_1.Length.SHORT]),
        };
    }
    restore(snapshot) {
        return this.new({
            [secretary_like_1.Length.LONG]: this.hFactory.restore(snapshot.long),
            [secretary_like_1.Length.SHORT]: this.hFactory.restore(snapshot.short),
        });
    }
}
exports.BalanceFactory = BalanceFactory;
//# sourceMappingURL=balance.js.map