"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginManager = exports.makeEmptyMarginSnapshot = void 0;
const interfaces_1 = require("../../interfaces");
const _2_freezing_margin_manager_1 = require("./2-freezing-margin-manager");
const big_js_1 = require("big.js");
const util_1 = require("util");
function makeEmptyMarginSnapshot() {
    return {
        frozenPosition: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
        frozenBalance: new big_js_1.default(0),
        marginSum: new big_js_1.default(0),
    };
}
exports.makeEmptyMarginSnapshot = makeEmptyMarginSnapshot;
class MarginManager extends _2_freezing_margin_manager_1.MarginManager {
    constructor(config, snapshot, getSettlementPrice, getLatestPrice, equity) {
        super();
        this.config = config;
        this.getSettlementPrice = getSettlementPrice;
        this.getLatestPrice = getLatestPrice;
        this.equity = equity;
        this.frozenBalance = new big_js_1.default(snapshot.frozenBalance);
        this.frozenPosition = {
            [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.frozenPosition[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.frozenPosition[interfaces_1.Length.SHORT]),
        };
        this.marginSum = new big_js_1.default(snapshot.marginSum);
    }
    /** @returns 可直接 JSON 序列化 */
    capture() {
        return {
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            marginSum: this.marginSum,
        };
    }
    [util_1.inspect.custom]() {
        return this.toJSON();
    }
    toJSON() {
        return {
            margin: this.margin,
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
            marginSum: this.marginSum,
        };
    }
}
exports.MarginManager = MarginManager;
//# sourceMappingURL=main.js.map