"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMargin = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const util_1 = require("util");
class StateMargin {
    constructor(core, snapshot) {
        this.core = core;
        if (snapshot) {
            this.frozen = {
                balance: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.frozen.balance[interfaces_1.Length.LONG]),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.frozen.balance[interfaces_1.Length.SHORT]),
                },
                position: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.frozen.position[interfaces_1.Length.LONG]),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.frozen.position[interfaces_1.Length.SHORT]),
                },
            };
            this[interfaces_1.Length.LONG] = new big_js_1.default(snapshot[interfaces_1.Length.LONG]);
            this[interfaces_1.Length.SHORT] = new big_js_1.default(snapshot[interfaces_1.Length.SHORT]);
        }
        else {
            this.frozen = {
                balance: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(0),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(0),
                },
                position: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(0),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(0),
                },
            };
            this[interfaces_1.Length.LONG] = new big_js_1.default(0);
            this[interfaces_1.Length.SHORT] = new big_js_1.default(0);
        }
    }
    get available() {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.core.calculation.totalFrozenBalance());
    }
    get closable() {
        return {
            [interfaces_1.Length.LONG]: this.core.states.assets.position[interfaces_1.Length.LONG]
                .minus(this.frozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.core.states.assets.position[interfaces_1.Length.SHORT]
                .minus(this.frozen.position[interfaces_1.Length.SHORT]),
        };
    }
    incMargin(length, increment) {
        if (increment.lt(0))
            this.decMargin(length, new big_js_1.default(0).minus(increment));
        else
            this[length] = this[length].plus(increment);
    }
    decMargin(length, decrement) {
        if (decrement.lt(0))
            this.incMargin(length, new big_js_1.default(0).minus(decrement));
        else if (decrement.lte(this[length]))
            this[length] = this[length].minus(decrement);
        else {
            const rest = decrement.minus(this[length]);
            this[length] = new big_js_1.default(0);
            this.incMargin(-length, rest);
        }
    }
    freeze(toFreeze) {
        this.frozen = interfaces_1.Frozen.plus(this.frozen, toFreeze);
        if (this.available.lt(0) ||
            this.closable[interfaces_1.Length.LONG].lt(0) ||
            this.closable[interfaces_1.Length.SHORT].lt(0)) {
            this.thaw(toFreeze);
            throw new Error('No enough to freeze');
        }
    }
    thaw(toThaw) {
        this.frozen = interfaces_1.Frozen.minus(this.frozen, toThaw);
        if (this.frozen.balance[interfaces_1.Length.LONG].lt(0) ||
            this.frozen.balance[interfaces_1.Length.SHORT].lt(0) ||
            this.frozen.position[interfaces_1.Length.LONG].lt(0) ||
            this.frozen.position[interfaces_1.Length.SHORT].lt(0)) {
            this.freeze(toThaw);
            throw new Error('No enough to thaw');
        }
    }
    capture() {
        return {
            frozen: {
                position: {
                    [interfaces_1.Length.LONG]: this.frozen.position[interfaces_1.Length.LONG],
                    [interfaces_1.Length.SHORT]: this.frozen.position[interfaces_1.Length.SHORT],
                },
                balance: {
                    [interfaces_1.Length.LONG]: this.frozen.balance[interfaces_1.Length.LONG],
                    [interfaces_1.Length.SHORT]: this.frozen.balance[interfaces_1.Length.SHORT],
                },
            },
            [interfaces_1.Length.LONG]: this[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: this[interfaces_1.Length.SHORT],
        };
    }
    [util_1.inspect.custom]() {
        return JSON.stringify({
            [interfaces_1.Length.LONG]: this[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: this[interfaces_1.Length.SHORT],
            frozen: {
                position: {
                    [interfaces_1.Length.LONG]: this.frozen.position[interfaces_1.Length.LONG],
                    [interfaces_1.Length.SHORT]: this.frozen.position[interfaces_1.Length.SHORT],
                },
                balance: {
                    [interfaces_1.Length.LONG]: this.frozen.balance[interfaces_1.Length.LONG],
                    [interfaces_1.Length.SHORT]: this.frozen.balance[interfaces_1.Length.SHORT],
                },
            },
            available: this.available,
            closable: this.closable,
        });
    }
}
exports.StateMargin = StateMargin;
//# sourceMappingURL=margin.js.map