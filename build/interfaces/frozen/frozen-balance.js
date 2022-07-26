"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenBalanceStatic = exports.FrozenBalance = void 0;
const secretary_like_1 = require("secretary-like");
class FrozenBalance {
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
exports.FrozenBalance = FrozenBalance;
class FrozenBalanceStatic {
    constructor(H) {
        this.H = H;
    }
    capture(balance) {
        return {
            long: this.H.capture(balance.get(secretary_like_1.Length.LONG)),
            short: this.H.capture(balance.get(secretary_like_1.Length.SHORT)),
        };
    }
    restore(snapshot) {
        return new FrozenBalance(this.H.restore(snapshot.long), this.H.restore(snapshot.short));
    }
    copy(balance) {
        return new FrozenBalance(balance.get(secretary_like_1.Length.LONG), balance.get(secretary_like_1.Length.SHORT));
    }
}
exports.FrozenBalanceStatic = FrozenBalanceStatic;
//# sourceMappingURL=frozen-balance.js.map