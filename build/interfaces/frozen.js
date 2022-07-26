"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenStatic = exports.FrozenFactory = void 0;
const secretary_like_1 = require("secretary-like");
const balance_1 = require("./balance");
class FrozenFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
        this.positionFactory = new secretary_like_1.PositionFactory(this.hFactory);
        this.balanceFactory = new balance_1.BalanceFactory(this.hFactory);
    }
    capture(frozen) {
        return {
            balance: this.balanceFactory.capture(frozen.balance),
            position: this.positionFactory.capture(frozen.position),
        };
    }
    restore(snapshot) {
        return {
            balance: this.balanceFactory.restore(snapshot.balance),
            position: this.positionFactory.restore(snapshot.position),
        };
    }
}
exports.FrozenFactory = FrozenFactory;
class FrozenStatic {
    constructor(hFactory) {
        this.hFactory = hFactory;
        this.ZERO = {
            balance: new balance_1.Balance(this.hFactory.from(0), this.hFactory.from(0)),
            position: new secretary_like_1.Position(this.hFactory.from(0), this.hFactory.from(0)),
        };
    }
    plus(x, y) {
        return {
            balance: new balance_1.Balance(x.balance.get(secretary_like_1.Length.LONG).plus(y.balance.get(secretary_like_1.Length.LONG)), x.balance.get(secretary_like_1.Length.SHORT).plus(y.balance.get(secretary_like_1.Length.SHORT))),
            position: new secretary_like_1.Position(x.position.get(secretary_like_1.Length.LONG).plus(y.position.get(secretary_like_1.Length.LONG)), x.position.get(secretary_like_1.Length.SHORT).plus(y.position.get(secretary_like_1.Length.SHORT))),
        };
    }
    minus(x, y) {
        if (typeof y === 'undefined') {
            y = x;
            x = this.ZERO;
        }
        return {
            balance: new balance_1.Balance(x.balance.get(secretary_like_1.Length.LONG).minus(y.balance.get(secretary_like_1.Length.LONG)), x.balance.get(secretary_like_1.Length.SHORT).minus(y.balance.get(secretary_like_1.Length.SHORT))),
            position: new secretary_like_1.Position(x.position.get(secretary_like_1.Length.LONG).minus(y.position.get(secretary_like_1.Length.LONG)), x.position.get(secretary_like_1.Length.SHORT).minus(y.position.get(secretary_like_1.Length.SHORT))),
        };
    }
}
exports.FrozenStatic = FrozenStatic;
//# sourceMappingURL=frozen.js.map