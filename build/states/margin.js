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
            this.frozenBalance = new big_js_1.default(snapshot.frozenBalance);
            this.frozenPosition = {
                [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.frozenPosition[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.frozenPosition[interfaces_1.Length.SHORT]),
            };
            this[interfaces_1.Length.LONG] = new big_js_1.default(snapshot[interfaces_1.Length.LONG]);
            this[interfaces_1.Length.SHORT] = new big_js_1.default(snapshot[interfaces_1.Length.SHORT]);
        }
        else {
            this.frozenBalance = new big_js_1.default(0);
            this.frozenPosition = {
                [interfaces_1.Length.LONG]: new big_js_1.default(0),
                [interfaces_1.Length.SHORT]: new big_js_1.default(0),
            };
            this[interfaces_1.Length.LONG] = new big_js_1.default(0);
            this[interfaces_1.Length.SHORT] = new big_js_1.default(0);
        }
    }
    get available() {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.frozenBalance);
    }
    get closable() {
        return {
            [interfaces_1.Length.LONG]: this.core.states.assets.position[interfaces_1.Length.LONG]
                .minus(this.frozenPosition[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.core.states.assets.position[interfaces_1.Length.SHORT]
                .minus(this.frozenPosition[interfaces_1.Length.SHORT]),
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
        this.frozenBalance = this.frozenBalance.plus(toFreeze.balance);
        this.frozenPosition[interfaces_1.Length.LONG] = this.frozenPosition[interfaces_1.Length.LONG].plus(toFreeze.position[interfaces_1.Length.LONG]);
        this.frozenPosition[interfaces_1.Length.SHORT] = this.frozenPosition[interfaces_1.Length.SHORT].plus(toFreeze.position[interfaces_1.Length.SHORT]);
        if (this.available.lt(0) ||
            this.closable[interfaces_1.Length.LONG].lt(0) ||
            this.closable[interfaces_1.Length.SHORT].lt(0)) {
            this.thaw(toFreeze);
            throw new Error('No enough to freeze');
        }
    }
    thaw(toThaw) {
        this.frozenBalance = this.frozenBalance.minus(toThaw.balance);
        this.frozenPosition[interfaces_1.Length.LONG] = this.frozenPosition[interfaces_1.Length.LONG].minus(toThaw.position[interfaces_1.Length.LONG]);
        this.frozenPosition[interfaces_1.Length.SHORT] = this.frozenPosition[interfaces_1.Length.SHORT].minus(toThaw.position[interfaces_1.Length.SHORT]);
        if (this.frozenBalance.lt(0) ||
            this.frozenPosition[interfaces_1.Length.LONG].lt(0) ||
            this.frozenPosition[interfaces_1.Length.SHORT].lt(0)) {
            this.freeze(toThaw);
            throw new Error('No enough to thaw');
        }
    }
    capture() {
        return {
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            [interfaces_1.Length.LONG]: this[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: this[interfaces_1.Length.SHORT],
        };
    }
    [util_1.inspect.custom]() {
        return JSON.stringify({
            [interfaces_1.Length.LONG]: this[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: this[interfaces_1.Length.SHORT],
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
        });
    }
}
exports.StateMargin = StateMargin;
//# sourceMappingURL=margin.js.map