"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoAssets = exports.makeEmptySnapshot = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
function makeEmptySnapshot(balance) {
    return {
        position: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
        frozenPosition: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
        cost: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
        frozenBalance: new big_js_1.default(0),
        staticMargin: new big_js_1.default(0),
        balance,
    };
}
exports.makeEmptySnapshot = makeEmptySnapshot;
class AutoAssets {
    constructor(config, snapshot, getSettlementPrice, getLatestPrice) {
        this.config = config;
        this.getSettlementPrice = getSettlementPrice;
        this.getLatestPrice = getLatestPrice;
        this.balance = new big_js_1.default(snapshot.balance);
        this.frozenBalance = new big_js_1.default(snapshot.frozenBalance);
        this.frozenPosition = {
            [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.frozenPosition[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.frozenPosition[interfaces_1.Length.SHORT]),
        };
        this.position = {
            [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.position[interfaces_1.Length.SHORT]),
        };
        this.cost = {
            [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.cost[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.cost[interfaces_1.Length.SHORT]),
        };
        this.staticMargin = new big_js_1.default(snapshot.staticMargin);
    }
    capture() {
        return {
            position: this.position,
            cost: this.cost,
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            staticMargin: this.staticMargin,
            balance: this.balance,
        };
    }
    get margin() {
        return this.config.calcMargin(this.config, this, this.getSettlementPrice(), this.getLatestPrice(), this.staticMargin).round(this.config.CURRENCY_DP);
    }
    get available() {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenBalance);
    }
    get closable() {
        return {
            [interfaces_1.Length.LONG]: this.position[interfaces_1.Length.LONG]
                .minus(this.frozenPosition[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.position[interfaces_1.Length.SHORT]
                .minus(this.frozenPosition[interfaces_1.Length.SHORT]),
        };
    }
    toJSON() {
        return {
            balance: this.balance,
            cost: this.cost,
            margin: this.margin,
            position: this.position,
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
        };
    }
}
exports.AutoAssets = AutoAssets;
//# sourceMappingURL=auto-assets.js.map