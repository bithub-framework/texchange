"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMargin = void 0;
const interfaces_1 = require("../interfaces");
const util_1 = require("util");
class StateMargin {
    constructor(core, snapshot) {
        this.core = core;
        this.frozenBalance = snapshot.frozenBalance;
        this.frozenPosition = {
            [interfaces_1.Length.LONG]: snapshot.frozenPosition[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: snapshot.frozenPosition[interfaces_1.Length.SHORT],
        };
        this[interfaces_1.Length.LONG] = snapshot[interfaces_1.Length.LONG];
        this[interfaces_1.Length.SHORT] = snapshot[interfaces_1.Length.SHORT];
    }
    // public incPositionMargin(
    //     length: Length,
    //     increment: Big,
    // ) {
    //     this[length] = this[length].plus(increment);
    // }
    // public decPositionMargin(
    //     length: Length,
    //     decrement: Big,
    // ) {
    //     this[length] = this[length].minus(decrement);
    // }
    // public setPositionMargin(
    //     length: Length,
    //     positionMargin: Big,
    // ) {
    //     this[length] = positionMargin;
    // }
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
    freeze(toFreeze) {
        this.frozenBalance = this.frozenBalance.plus(toFreeze.balance);
        this.frozenPosition[toFreeze.length] = this.frozenPosition[toFreeze.length].plus(toFreeze.position);
        if (this.available.lt(0) || this.closable[toFreeze.length].lt(0)) {
            this.thaw(toFreeze);
            throw new Error('No enough to freeze');
        }
    }
    thaw(frozen) {
        this.frozenBalance = this.frozenBalance.minus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].minus(frozen.position);
        if (this.frozenBalance.lt(0) || this.frozenPosition[frozen.length].lt(0)) {
            this.freeze(frozen);
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