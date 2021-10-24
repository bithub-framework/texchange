"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMargin = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class StateMargin {
    constructor(core) {
        this.core = core;
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
    get available() {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.core.calculation.totalFrozenBalance());
    }
    get closable() {
        const { assets } = this.core.states;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(this.frozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(this.frozen.position[interfaces_1.Length.SHORT]),
        };
    }
    incMargin(length, volume, dollarVolume) {
        this[length] = this[length]
            .plus(this.core.calculation.marginIncrement(length, volume, dollarVolume)).round(this.core.config.CURRENCY_DP);
    }
    decMargin(length, volume, dollarVolume) {
        const { assets } = this.core.states;
        if (volume.lte(assets.position[length])) {
            this[length] = this[length]
                .times(assets.position[length].minus(volume))
                .div(assets.position[length])
                .round(this.core.config.CURRENCY_DP);
        }
        else {
            const restVolume = volume.minus(assets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.core.config.CURRENCY_DP);
            this[length] = new big_js_1.default(0);
            this.incMargin(-length, restVolume, restDollarVolume);
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
    restore(snapshot) {
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
}
exports.StateMargin = StateMargin;
//# sourceMappingURL=margin.js.map