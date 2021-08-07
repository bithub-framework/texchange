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
        positionMargin: {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        },
    };
}
exports.makeEmptyMarginSnapshot = makeEmptyMarginSnapshot;
class MarginManager extends _2_freezing_margin_manager_1.MarginManager {
    constructor(config, snapshot, equity, core) {
        super();
        this.config = config;
        this.equity = equity;
        this.core = core;
        this.frozenBalance = snapshot.frozenBalance;
        this.frozenPosition = {
            [interfaces_1.Length.LONG]: snapshot.frozenPosition[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: snapshot.frozenPosition[interfaces_1.Length.SHORT],
        };
        this.positionMargin = {
            [interfaces_1.Length.LONG]: snapshot.positionMargin[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: snapshot.positionMargin[interfaces_1.Length.SHORT],
        };
    }
    /** @returns 可直接 JSON 序列化 */
    capture() {
        return {
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            positionMargin: this.positionMargin,
        };
    }
    [util_1.inspect.custom]() {
        return JSON.stringify({
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
            positionMargin: this.positionMargin,
        });
    }
}
exports.MarginManager = MarginManager;
//# sourceMappingURL=main.js.map