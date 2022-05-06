"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenStatic = void 0;
const secretary_like_1 = require("secretary-like");
class FrozenStatic {
    constructor(H) {
        this.H = H;
        this.ZERO = {
            balance: {
                [secretary_like_1.Length.LONG]: new this.H(0),
                [secretary_like_1.Length.SHORT]: new this.H(0),
            },
            position: {
                [secretary_like_1.Length.LONG]: new this.H(0),
                [secretary_like_1.Length.SHORT]: new this.H(0),
            },
        };
    }
    plus(x, y) {
        return {
            balance: {
                [secretary_like_1.Length.LONG]: x.balance[secretary_like_1.Length.LONG].plus(y.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.balance[secretary_like_1.Length.SHORT].plus(y.balance[secretary_like_1.Length.SHORT]),
            },
            position: {
                [secretary_like_1.Length.LONG]: x.position[secretary_like_1.Length.LONG].plus(y.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.position[secretary_like_1.Length.SHORT].plus(y.position[secretary_like_1.Length.SHORT]),
            },
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
            position: {
                [secretary_like_1.Length.LONG]: x.position[secretary_like_1.Length.LONG].minus(y.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: x.position[secretary_like_1.Length.SHORT].minus(y.position[secretary_like_1.Length.SHORT]),
            },
        };
    }
    capture(frozen) {
        return {
            balance: {
                [secretary_like_1.Length.LONG]: this.H.capture(frozen.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.capture(frozen.balance[secretary_like_1.Length.SHORT]),
            },
            position: {
                [secretary_like_1.Length.LONG]: this.H.capture(frozen.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.capture(frozen.position[secretary_like_1.Length.SHORT]),
            },
        };
    }
    restore(snapshot) {
        return {
            balance: {
                [secretary_like_1.Length.LONG]: this.H.restore(snapshot.balance[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.restore(snapshot.balance[secretary_like_1.Length.SHORT]),
            },
            position: {
                [secretary_like_1.Length.LONG]: this.H.restore(snapshot.position[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.restore(snapshot.position[secretary_like_1.Length.SHORT]),
            },
        };
    }
}
exports.FrozenStatic = FrozenStatic;
//# sourceMappingURL=frozen.js.map