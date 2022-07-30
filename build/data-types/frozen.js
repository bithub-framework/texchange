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
    constructor(hFactory, positionFactory) {
        this.hFactory = hFactory;
        this.positionFactory = positionFactory;
        this.ZERO = {
            balance: {
                [secretary_like_1.Length.LONG]: this.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.hFactory.from(0),
            },
            position: this.positionFactory.new({
                [secretary_like_1.Length.LONG]: this.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.hFactory.from(0),
            }),
        };
    }
    plus(x, y) {
        return {
            balance: {
                [secretary_like_1.Length.LONG]: x.balance[secretary_like_1.Length.LONG].plus(y.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.balance[secretary_like_1.Length.SHORT].plus(y.balance[secretary_like_1.Length.SHORT]),
            },
            position: this.positionFactory.new({
                [secretary_like_1.Length.LONG]: x.position[secretary_like_1.Length.LONG].plus(y.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.position[secretary_like_1.Length.SHORT].plus(y.position[secretary_like_1.Length.SHORT]),
            }),
        };
    }
    minus(x, y) {
        if (typeof y === 'undefined') {
            y = x;
            x = this.ZERO;
        }
        return {
            balance: {
                [secretary_like_1.Length.LONG]: x.balance[secretary_like_1.Length.LONG].minus(y.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.balance[secretary_like_1.Length.SHORT].minus(y.balance[secretary_like_1.Length.SHORT]),
            },
            position: this.positionFactory.new({
                [secretary_like_1.Length.LONG]: x.position[secretary_like_1.Length.LONG].minus(y.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.position[secretary_like_1.Length.SHORT].minus(y.position[secretary_like_1.Length.SHORT]),
            }),
        };
    }
}
exports.FrozenStatic = FrozenStatic;
//# sourceMappingURL=frozen.js.map