"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultContainer = void 0;
const base_container_1 = require("./base-container");
// Context
const context_1 = require("../context");
const default_1 = require("../context.d/market-calc/default");
// Models
const makers_1 = require("../models.d/makers/makers");
const default_2 = require("../models.d/makers/default");
const pricing_1 = require("../models.d/pricing/pricing");
const default_3 = require("../models.d/pricing/default");
const models_1 = require("../models");
//Broadcast
const broadcast_1 = require("../broadcast");
const default_4 = require("../tasks.d/get-available/default");
const default_5 = require("../tasks.d/settle/default");
const default_6 = require("../tasks.d/margin-accumulation/default");
const tasks_1 = require("../tasks/tasks");
const default_7 = require("../tasks/default");
// Mark to market
const mtm_1 = require("../mark-to-market/mtm");
const default_8 = require("../mark-to-market/default");
// Use cases
const update_trades_1 = require("../use-cases.d/update-trades");
function createDefaultContainer(config, timeline, H) {
    const c = (0, base_container_1.createBaseContainer)(config, timeline, H);
    c.rcs(3 /* MarketCalc */, default_1.DefaultMarketCalc);
    c.rcs(makers_1.Makers, default_2.DefaultMakers);
    c.rcs(pricing_1.Pricing, default_3.DefaultPricing);
    c.rcs(mtm_1.Mtm, default_8.DefaultMtm);
    c.ra(default_4.DefaultGetAvailable.TaskDeps, tasks_1.Tasks);
    c.ra(default_5.DefaultSettle.TaskDeps, tasks_1.Tasks);
    c.ra(default_6.DefaultMarginAccumulation.TaskDeps, tasks_1.Tasks);
    c.rcs(14 /* GetAvailableLike */, default_4.DefaultGetAvailable);
    c.rcs(15 /* SettleLike */, default_5.DefaultSettle);
    c.rcs(16 /* MarginAccumulationLike */, default_6.DefaultMarginAccumulation);
    c.rcs(tasks_1.Tasks, default_7.DefaultTasks);
    c.rfs(update_trades_1.UpdateTrades, () => new update_trades_1.UpdateTrades(c.i(context_1.Context), c.i(models_1.Models), c.i(broadcast_1.Broadcast), c.i(tasks_1.Tasks), true));
    return c;
}
exports.createDefaultContainer = createDefaultContainer;
//# sourceMappingURL=default.js.map