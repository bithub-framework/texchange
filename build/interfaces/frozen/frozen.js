"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenStatic = void 0;
const secretary_like_1 = require("secretary-like");
const frozen_balance_1 = require("./frozen-balance");
class FrozenStatic {
    constructor(H) {
        this.H = H;
        this.Position = new secretary_like_1.PositionStatic(this.H);
        this.FrozenBalance = new frozen_balance_1.FrozenBalanceStatic(this.H);
        this.ZERO = {
            balance: new frozen_balance_1.FrozenBalance(this.H.from(0), this.H.from(0)),
            position: new secretary_like_1.Position(this.H.from(0), this.H.from(0)),
        };
    }
    plus(x, y) {
        return {
            balance: new frozen_balance_1.FrozenBalance(x.balance.get(secretary_like_1.Length.LONG).plus(y.balance.get(secretary_like_1.Length.LONG)), x.balance.get(secretary_like_1.Length.SHORT).plus(y.balance.get(secretary_like_1.Length.SHORT))),
            position: new secretary_like_1.Position(x.position.get(secretary_like_1.Length.LONG).plus(y.position.get(secretary_like_1.Length.LONG)), x.position.get(secretary_like_1.Length.SHORT).plus(y.position.get(secretary_like_1.Length.SHORT))),
        };
    }
    minus(x, y) {
        if (typeof y === 'undefined') {
            y = x;
            x = this.ZERO;
        }
        return {
            balance: new frozen_balance_1.FrozenBalance(x.balance.get(secretary_like_1.Length.LONG).minus(y.balance.get(secretary_like_1.Length.LONG)), x.balance.get(secretary_like_1.Length.SHORT).minus(y.balance.get(secretary_like_1.Length.SHORT))),
            position: new secretary_like_1.Position(x.position.get(secretary_like_1.Length.LONG).minus(y.position.get(secretary_like_1.Length.LONG)), x.position.get(secretary_like_1.Length.SHORT).minus(y.position.get(secretary_like_1.Length.SHORT))),
        };
    }
    capture(frozen) {
        return {
            balance: this.FrozenBalance.capture(frozen.balance),
            position: this.Position.capture(frozen.position),
        };
    }
    restore(snapshot) {
        return {
            balance: this.FrozenBalance.restore(snapshot.balance),
            position: this.Position.restore(snapshot.position),
        };
    }
}
exports.FrozenStatic = FrozenStatic;
//# sourceMappingURL=frozen.js.map