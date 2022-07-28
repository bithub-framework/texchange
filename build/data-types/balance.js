"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = exports.Balance = void 0;
const secretary_like_1 = require("secretary-like");
class Balance {
}
exports.Balance = Balance;
class BalanceFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(balance) {
        return {
            long: this.hFactory.capture(balance[secretary_like_1.Length.LONG]),
            short: this.hFactory.capture(balance[secretary_like_1.Length.SHORT]),
        };
    }
    restore(snapshot) {
        return {
            [secretary_like_1.Length.LONG]: this.hFactory.restore(snapshot.long),
            [secretary_like_1.Length.SHORT]: this.hFactory.restore(snapshot.short),
        };
    }
    copy(balance) {
        return {
            [secretary_like_1.Length.LONG]: balance[secretary_like_1.Length.LONG],
            [secretary_like_1.Length.SHORT]: balance[secretary_like_1.Length.SHORT],
        };
    }
}
exports.BalanceFactory = BalanceFactory;
//# sourceMappingURL=balance.js.map