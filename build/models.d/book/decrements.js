"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecrementsStatic = void 0;
const secretary_like_1 = require("secretary-like");
class DecrementsStatic {
    constructor(H) {
        this.H = H;
    }
    capture(decrements) {
        return {
            [secretary_like_1.Side.ASK]: [...decrements[secretary_like_1.Side.ASK]].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
            [secretary_like_1.Side.BID]: [...decrements[secretary_like_1.Side.BID]].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
        };
    }
    restore(snapshot) {
        const decrements = {};
        for (const side of [secretary_like_1.Side.ASK, secretary_like_1.Side.BID]) {
            decrements[side] = new Map(snapshot[side].map(([priceString, decrement]) => [priceString, this.H.restore(decrement)]));
        }
        return decrements;
    }
}
exports.DecrementsStatic = DecrementsStatic;
//# sourceMappingURL=decrements.js.map