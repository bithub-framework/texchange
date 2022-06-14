"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const container_1 = require("../container");
const types_1 = require("../types");
const default_1 = require("../../context.d/market-calc/default");
const default_2 = require("../../models.d/makers/default");
const default_3 = require("../../models.d/pricing/default");
const default_4 = require("../../tasks.d/get-available/default");
const default_5 = require("../../tasks.d/margin-accumulation/default");
const default_6 = require("../../tasks.d/settle/default");
const default_7 = require("../../mark-to-market/default");
class Container extends container_1.Container {
    constructor(timeline, H, spec) {
        super();
        this[_a] = this.rcs(default_1.DefaultMarketCalc);
        this[_b] = this.rcs(default_2.DefaultMakers);
        this[_c] = this.rcs(default_3.DefaultPricing);
        this[_d] = this.rcs(default_4.DefaultTaskGetAvailable);
        this[_e] = this.rcs(default_5.DefaultTaskMarginAccumulation);
        this[_f] = this.rcs(default_6.DefaultTaskSettle);
        this[_g] = this.rcs(default_7.DefaultMtm);
        this[_h] = this.rv(true);
        this[types_1.TYPES.spec] = this.rv(spec);
        this[types_1.TYPES.TimelineLike] = this.rv(timeline);
        this[types_1.TYPES.HStatic] = this.rv(H);
    }
}
exports.Container = Container;
types_1.TYPES.HStatic, types_1.TYPES.spec, types_1.TYPES.TimelineLike, _a = types_1.TYPES.MarketCalc, _b = types_1.TYPES.MODELS.Makers, _c = types_1.TYPES.MODELS.Pricing, _d = types_1.TYPES.TASKS.GetAvailable, _e = types_1.TYPES.TASKS.MarginAccumulation, _f = types_1.TYPES.TASKS.Settle, _g = types_1.TYPES.Mtm, _h = types_1.TYPES.USE_CASES.realTimeSettlement;
//# sourceMappingURL=container.js.map