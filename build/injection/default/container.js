"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const container_1 = require("../container");
const types_1 = require("./types");
// Spec
const default_market_spec_1 = require("../../spec/default-market-spec");
const default_account_spec_1 = require("../../spec/default-account-spec");
const default_1 = require("../../models.d/makers/default");
const default_2 = require("../../models.d/pricing/default");
const default_3 = require("../../models.d/margin-assets/default");
const default_4 = require("../../middlewares/available-assets-calculator/default");
class Container extends container_1.Container {
    constructor(vmctx, initialBalance, initialSettlementPrice) {
        super();
        this[_a] = this.rcs(default_market_spec_1.DefaultMarketSpec);
        this[_b] = this.rcs(default_account_spec_1.DefaultAccountSpec);
        this[_c] = this.rcs(default_1.DefaultMakers);
        this[_d] = this.rcs(default_2.DefaultPricing);
        this[_e] = this.rcs(default_3.DefaultMarginAssets);
        this[_f] = this.rcs(default_4.DefaultAvailableAssetsCalculator);
        this[_g] = this.rv(null);
        this[_h] = this.rv({
            ping: 20,
            processing: 20,
        });
        this[types_1.TYPES.vmctx] = this.rv(vmctx);
        this[types_1.TYPES.MODELS.initialBalance] = this.rv(initialBalance);
        this[types_1.TYPES.initialSettlementPrice] = this.rv(initialSettlementPrice);
    }
}
exports.Container = Container;
types_1.TYPES.vmctx, _a = types_1.TYPES.marketSpec, _b = types_1.TYPES.accountSpec, types_1.TYPES.MODELS.initialBalance, _c = types_1.TYPES.MODELS.makers, _d = types_1.TYPES.MODELS.pricing, _e = types_1.TYPES.MODELS.marginAssets, _f = types_1.TYPES.MIDDLEWARES.availableAssetsCalculator, _g = types_1.TYPES.mtm, _h = types_1.TYPES.FACADES.config;
//# sourceMappingURL=container.js.map