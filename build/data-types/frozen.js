"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenStatic = exports.FrozenFactory = void 0;
const secretary_like_1 = require("secretary-like");
class Frozen {
    constructor(source, factory, balanceFactory, positionFactory) {
        this.factory = factory;
        this.balance = balanceFactory.new(source.balance);
        this.position = positionFactory.new(source.position);
    }
    toJSON() {
        return this.factory.capture(this);
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
class FrozenFactory {
    constructor(balanceFactory, positionFactory) {
        this.balanceFactory = balanceFactory;
        this.positionFactory = positionFactory;
    }
    new(source) {
        return new Frozen(source, this, this.balanceFactory, this.positionFactory);
    }
    capture(frozen) {
        return {
            balance: this.balanceFactory.capture(frozen.balance),
            position: this.positionFactory.capture(frozen.position),
        };
    }
    restore(snapshot) {
        return this.new({
            balance: this.balanceFactory.restore(snapshot.balance),
            position: this.positionFactory.restore(snapshot.position),
        });
    }
}
exports.FrozenFactory = FrozenFactory;
class FrozenStatic {
    constructor(frozenFactory, hFactory) {
        this.frozenFactory = frozenFactory;
        this.hFactory = hFactory;
        this.ZERO = this.frozenFactory.new({
            balance: {
                [secretary_like_1.Length.LONG]: this.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.hFactory.from(0),
            },
            position: {
                [secretary_like_1.Length.LONG]: this.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.hFactory.from(0),
            },
        });
    }
    plus(x, y) {
        return this.frozenFactory.new({
            balance: {
                [secretary_like_1.Length.LONG]: x.balance[secretary_like_1.Length.LONG].plus(y.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.balance[secretary_like_1.Length.SHORT].plus(y.balance[secretary_like_1.Length.SHORT]),
            },
            position: {
                [secretary_like_1.Length.LONG]: x.position[secretary_like_1.Length.LONG].plus(y.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.position[secretary_like_1.Length.SHORT].plus(y.position[secretary_like_1.Length.SHORT]),
            },
        });
    }
    minus(x, y) {
        if (typeof y === 'undefined') {
            y = x;
            x = this.ZERO;
        }
        return this.frozenFactory.new({
            balance: {
                [secretary_like_1.Length.LONG]: x.balance[secretary_like_1.Length.LONG].minus(y.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.balance[secretary_like_1.Length.SHORT].minus(y.balance[secretary_like_1.Length.SHORT]),
            },
            position: {
                [secretary_like_1.Length.LONG]: x.position[secretary_like_1.Length.LONG].minus(y.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.position[secretary_like_1.Length.SHORT].minus(y.position[secretary_like_1.Length.SHORT]),
            },
        });
    }
}
exports.FrozenStatic = FrozenStatic;
//# sourceMappingURL=frozen.js.map