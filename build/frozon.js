"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frozen = void 0;
__exportStar(require("interfaces"), exports);
const interfaces_1 = require("interfaces");
const big_js_1 = require("big.js");
var Frozen;
(function (Frozen) {
    function plus(x, y) {
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
    Frozen.plus = plus;
    Frozen.ZERO = {
        balance: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
        position: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
    };
    function minus(x, y) {
        if (!y) {
            y = x;
            x = Frozen.ZERO;
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
    Frozen.minus = minus;
})(Frozen = exports.Frozen || (exports.Frozen = {}));
//# sourceMappingURL=frozon.js.map