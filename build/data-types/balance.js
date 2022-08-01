"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = void 0;
const secretary_like_1 = require("secretary-like");
class ConcreteBalance {
    constructor(source, factory) {
        this.factory = factory;
        ({
            [secretary_like_1.Length.LONG]: this[secretary_like_1.Length.LONG],
            [secretary_like_1.Length.SHORT]: this[secretary_like_1.Length.SHORT],
        } = source);
    }
    toJSON() {
        return this.factory.capture(this);
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
class BalanceFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    create(source) {
        return new ConcreteBalance(source, this);
    }
    capture(balance) {
        return {
            long: this.hFactory.capture(balance[secretary_like_1.Length.LONG]),
            short: this.hFactory.capture(balance[secretary_like_1.Length.SHORT]),
        };
    }
    restore(snapshot) {
        return this.create({
            [secretary_like_1.Length.LONG]: this.hFactory.restore(snapshot.long),
            [secretary_like_1.Length.SHORT]: this.hFactory.restore(snapshot.short),
        });
    }
}
exports.BalanceFactory = BalanceFactory;
//# sourceMappingURL=balance.js.map