"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const container_1 = require("../container");
const types_1 = require("../types");
// Spec
const default_market_spec_1 = require("../../spec/default-market-spec");
const default_account_spec_1 = require("../../spec/default-account-spec");
const default_1 = require("../../models.d/makers/default");
const default_2 = require("../../models.d/pricing/default");
const default_3 = require("../../tasks.d/get-available/default");
const default_4 = require("../../tasks.d/margin-accumulation/default");
const default_5 = require("../../tasks.d/settle/default");
const default_6 = require("../../mark-to-market/default");
class Container extends container_1.Container {
    constructor(timeline, H) {
        super();
        this[_a] = this.rcs(default_market_spec_1.DefaultMarketSpec);
        this[_b] = this.rcs(default_account_spec_1.DefaultAccountSpec);
        this[_c] = this.rcs(default_1.DefaultMakers);
        this[_d] = this.rcs(default_2.DefaultPricing);
        this[_e] = this.rcs(default_3.DefaultTaskGetAvailable);
        this[_f] = this.rcs(default_4.DefaultTaskMarginAccumulation);
        this[_g] = this.rcs(default_5.DefaultTaskSettle);
        this[_h] = this.rcs(default_6.DefaultMtm);
        this[_j] = this.rv(true);
        this[_k] = this.rv({
            ping: 20,
            processing: 20,
        });
        this[types_1.TYPES.timeline] = this.rv(timeline);
        this[types_1.TYPES.hStatic] = this.rv(H);
    }
}
exports.Container = Container;
types_1.TYPES.hStatic, _a = types_1.TYPES.marketSpec, _b = types_1.TYPES.accountSpec, types_1.TYPES.timeline, _c = types_1.TYPES.MODELS.makers, _d = types_1.TYPES.MODELS.pricing, _e = types_1.TYPES.TASKS.getAvailable, _f = types_1.TYPES.TASKS.marginAccumulation, _g = types_1.TYPES.TASKS.settle, _h = types_1.TYPES.mtm, _j = types_1.TYPES.USE_CASES.realTimeSettlement, _k = types_1.TYPES.FACADES.config;
//# sourceMappingURL=container.js.map