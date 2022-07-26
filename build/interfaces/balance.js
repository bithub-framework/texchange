"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = exports.Balance = void 0;
const secretary_like_1 = require("secretary-like");
class Balance {
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
    set(length, balance) {
        if (length === secretary_like_1.Length.LONG)
            this.long = balance;
        else
            this.short = balance;
    }
}
exports.Balance = Balance;
class BalanceFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(balance) {
        return {
            long: this.hFactory.capture(balance.get(secretary_like_1.Length.LONG)),
            short: this.hFactory.capture(balance.get(secretary_like_1.Length.SHORT)),
        };
    }
    restore(snapshot) {
        return new Balance(this.hFactory.restore(snapshot.long), this.hFactory.restore(snapshot.short));
    }
    copy(balance) {
        return new Balance(balance.get(secretary_like_1.Length.LONG), balance.get(secretary_like_1.Length.SHORT));
    }
}
exports.BalanceFactory = BalanceFactory;
//# sourceMappingURL=balance.js.map