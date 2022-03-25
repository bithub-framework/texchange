"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecrementsStatic = void 0;
const interfaces_1 = require("interfaces");
class DecrementsStatic {
    constructor(H) {
        this.H = H;
    }
    capture(decrements) {
        return {
            [interfaces_1.Side.ASK]: [...decrements[interfaces_1.Side.ASK]].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
            [interfaces_1.Side.BID]: [...decrements[interfaces_1.Side.BID]].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
        };
    }
    restore(snapshot) {
        const decrements = {};
        for (const side of [interfaces_1.Side.ASK, interfaces_1.Side.BID]) {
            decrements[side] = new Map(snapshot[side].map(([priceString, decrement]) => [priceString, this.H.restore(decrement)]));
        }
        return decrements;
    }
}
exports.DecrementsStatic = DecrementsStatic;
//# sourceMappingURL=decrements.js.map