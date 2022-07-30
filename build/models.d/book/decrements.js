"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecrementsFactory = void 0;
const secretary_like_1 = require("secretary-like");
class DecrementsFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(decrements) {
        return {
            bids: [...decrements[secretary_like_1.Side.BID]].map(([priceString, decrement]) => [priceString, this.hFactory.capture(decrement)]),
            asks: [...decrements[secretary_like_1.Side.ASK]].map(([priceString, decrement]) => [priceString, this.hFactory.capture(decrement)]),
        };
    }
    restore(snapshot) {
        return {
            [secretary_like_1.Side.BID]: new Map(snapshot.bids.map(([priceString, decrement]) => [priceString, this.hFactory.restore(decrement)])),
            [secretary_like_1.Side.ASK]: new Map(snapshot.asks.map(([priceString, decrement]) => [priceString, this.hFactory.restore(decrement)])),
        };
    }
}
exports.DecrementsFactory = DecrementsFactory;
//# sourceMappingURL=decrements.js.map