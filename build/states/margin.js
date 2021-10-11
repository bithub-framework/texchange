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
        this.positionMargin = {
            [interfaces_1.Length.LONG]: snapshot.positionMargin[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: snapshot.positionMargin[interfaces_1.Length.SHORT],
        };
    }
    incPositionMargin(length, increment) {
        this.positionMargin[length] = this.positionMargin[length].plus(increment);
    }
    decPositionMargin(length, decrement) {
        this.positionMargin[length] = this.positionMargin[length].minus(decrement);
    }
    setPositionMargin(length, positionMargin) {
        this.positionMargin[length] = positionMargin;
    }
    get available() {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalPositionMargin())
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
    freeze(frozen) {
        this.frozenBalance = this.frozenBalance.plus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].plus(frozen.position);
        if (this.available.lt(0) || this.closable[frozen.length].lt(0)) {
            this.thaw(frozen);
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
            positionMargin: this.positionMargin,
        };
    }
    [util_1.inspect.custom]() {
        return JSON.stringify({
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
            positionMargin: this.positionMargin,
        });
    }
}
exports.StateMargin = StateMargin;
//# sourceMappingURL=margin.js.map