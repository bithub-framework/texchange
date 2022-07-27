"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecrementsFactory = exports.Decrements = void 0;
const secretary_like_1 = require("secretary-like");
class Decrements extends secretary_like_1.SidePair {
}
exports.Decrements = Decrements;
class DecrementsFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(decrements) {
        return {
            bids: [...decrements.get(secretary_like_1.Side.BID)].map(([priceString, decrement]) => [priceString, this.hFactory.capture(decrement)]),
            asks: [...decrements.get(secretary_like_1.Side.ASK)].map(([priceString, decrement]) => [priceString, this.hFactory.capture(decrement)]),
        };
    }
    restore(snapshot) {
        return new Decrements(new Map(snapshot.bids.map(([priceString, decrement]) => [priceString, this.hFactory.restore(decrement)])), new Map(snapshot.asks.map(([priceString, decrement]) => [priceString, this.hFactory.restore(decrement)])));
    }
}
exports.DecrementsFactory = DecrementsFactory;
//# sourceMappingURL=decrements.js.map