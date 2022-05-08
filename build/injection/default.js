"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const base_container_1 = require("./base-container");
const types_1 = require("./types");
const default_1 = require("../context.d/market-calc/default");
const default_2 = require("../models.d/makers/default");
const default_3 = require("../models.d/pricing/default");
const default_4 = require("../tasks/default");
const default_5 = require("../mark-to-market/default");
// Use cases
const update_trades_1 = require("../use-cases.d/update-trades");
class Container extends base_container_1.Container {
    constructor() {
        super(...arguments);
        this[_a] = this.rcs(default_1.DefaultMarketCalc);
        this[_b] = this.rcs(default_2.DefaultMakers);
        this[_c] = this.rcs(default_3.DefaultPricing);
        this[_d] = this.rcs(default_5.DefaultMtm);
        this[_e] = this.rcs(default_4.DefaultTasks);
        this[_f] = this.rfs(() => new update_trades_1.UpdateTrades(this[types_1.TYPES.Context](), this[types_1.TYPES.Models](), this[types_1.TYPES.Broadcast](), this[types_1.TYPES.Tasks](), true));
    }
}
exports.Container = Container;
_a = types_1.TYPES.MarketCalc, _b = types_1.TYPES.Makers, _c = types_1.TYPES.Pricing, _d = types_1.TYPES.Mtm, _e = types_1.TYPES.Tasks, _f = types_1.TYPES.UpdateTrades;
//# sourceMappingURL=default.js.map