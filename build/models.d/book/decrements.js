"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecrementsStatic = exports.Decrements = void 0;
const secretary_like_1 = require("secretary-like");
class Decrements {
    constructor(bids, asks) {
        this.bids = bids;
        this.asks = asks;
    }
    get(side) {
        if (side === secretary_like_1.Side.BID)
            return this.bids;
        else
            return this.asks;
    }
    set(side, map) {
        if (side === secretary_like_1.Side.BID)
            this.bids = map;
        else
            this.asks = map;
    }
}
exports.Decrements = Decrements;
class DecrementsStatic {
    constructor(H) {
        this.H = H;
    }
    capture(decrements) {
        return {
            bids: [...decrements.get(secretary_like_1.Side.BID)].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
            asks: [...decrements.get(secretary_like_1.Side.ASK)].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
        };
    }
    restore(snapshot) {
        return new Decrements(new Map(snapshot.bids.map(([priceString, decrement]) => [priceString, this.H.restore(decrement)])), new Map(snapshot.asks.map(([priceString, decrement]) => [priceString, this.H.restore(decrement)])));
    }
}
exports.DecrementsStatic = DecrementsStatic;
//# sourceMappingURL=decrements.js.map