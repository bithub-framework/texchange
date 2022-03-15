"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenStatic = void 0;
const interfaces_1 = require("interfaces");
class FrozenStatic {
    constructor(H) {
        this.H = H;
        this.ZERO = {
            balance: {
                [interfaces_1.Length.LONG]: this.H.from(0),
                [interfaces_1.Length.SHORT]: this.H.from(0),
            },
            position: {
                [interfaces_1.Length.LONG]: this.H.from(0),
                [interfaces_1.Length.SHORT]: this.H.from(0),
            },
        };
    }
    plus(x, y) {
        return {
            balance: {
                [interfaces_1.Length.LONG]: x.balance[interfaces_1.Length.LONG].plus(y.balance[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: x.balance[interfaces_1.Length.SHORT].plus(y.balance[interfaces_1.Length.SHORT]),
            },
            position: {
                [interfaces_1.Length.LONG]: x.position[interfaces_1.Length.LONG].plus(y.position[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: x.position[interfaces_1.Length.SHORT].plus(y.position[interfaces_1.Length.SHORT]),
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
                [interfaces_1.Length.LONG]: x.balance[interfaces_1.Length.LONG].minus(y.balance[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: x.balance[interfaces_1.Length.SHORT].minus(y.balance[interfaces_1.Length.SHORT]),
            },
            position: {
                [interfaces_1.Length.LONG]: x.position[interfaces_1.Length.LONG].minus(y.position[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: x.position[interfaces_1.Length.SHORT].minus(y.position[interfaces_1.Length.SHORT]),
            },
        };
    }
    capture(frozen) {
        return {
            balance: {
                [interfaces_1.Length.LONG]: this.H.capture(frozen.balance[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.capture(frozen.balance[interfaces_1.Length.SHORT]),
            },
            position: {
                [interfaces_1.Length.LONG]: this.H.capture(frozen.position[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.capture(frozen.position[interfaces_1.Length.SHORT]),
            },
        };
    }
    restore(snapshot) {
        return {
            balance: {
                [interfaces_1.Length.LONG]: this.H.restore(snapshot.balance[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.restore(snapshot.balance[interfaces_1.Length.SHORT]),
            },
            position: {
                [interfaces_1.Length.LONG]: this.H.restore(snapshot.position[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.restore(snapshot.position[interfaces_1.Length.SHORT]),
            },
        };
    }
}
exports.FrozenStatic = FrozenStatic;
//# sourceMappingURL=frozon.js.map