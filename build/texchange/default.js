"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTexchange = void 0;
const texchange_1 = require("./texchange");
// Context
const context_1 = require("../context");
const default_1 = require("../context.d/market-calc/default");
// Models
const makers_1 = require("../models.d/makers/makers");
const default_2 = require("../models.d/makers/default");
const pricing_1 = require("../models.d/pricing/pricing");
const default_3 = require("../models.d/pricing/default");
const models_1 = require("../models");
// Tasks
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
const facades_1 = require("../facades");
class DefaultTexchange extends texchange_1.Texchange {
    constructor(config, timeline, H) {
        super(config, timeline, H);
        this.c.rcs(0 /* MarketCalc */, default_1.DefaultMarketCalc);
        this.c.rcs(makers_1.Makers, default_2.DefaultMakers);
        this.c.rcs(pricing_1.Pricing, default_3.DefaultPricing);
        this.c.rcs(mtm_1.Mtm, default_8.DefaultMtm);
        this.c.ra(default_4.DefaultGetAvailable.TaskDeps, tasks_1.Tasks);
        this.c.ra(default_5.DefaultSettle.TaskDeps, tasks_1.Tasks);
        this.c.ra(default_6.DefaultMarginAccumulation.TaskDeps, tasks_1.Tasks);
        this.c.rcs(11 /* GetAvailableLike */, default_4.DefaultGetAvailable);
        this.c.rcs(12 /* SettleLike */, default_5.DefaultSettle);
        this.c.rcs(13 /* MarginAccumulationLike */, default_6.DefaultMarginAccumulation);
        this.c.rcs(tasks_1.Tasks, default_7.DefaultTasks);
        this.c.rfs(update_trades_1.UpdateTrades, () => new update_trades_1.UpdateTrades(this.c.i(context_1.Context), this.c.i(models_1.Models), this.c.i(14 /* Broadcast */), this.c.i(tasks_1.Tasks), true));
        this.models = this.c.i(models_1.Models);
        this.mtm = this.c.i(mtm_1.Mtm);
        const facades = this.c.i(facades_1.Facades);
        this.user = facades.latency;
        this.admin = facades.joystick;
    }
    capture() {
        return {
            assets: this.models.assets.capture(),
            margins: this.models.margins.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            pricing: this.models.pricing.capture(),
            progress: this.models.progress.capture(),
        };
    }
    restore(snapshot) {
        this.models.assets.restore(snapshot.assets);
        this.models.margins.restore(snapshot.margins);
        this.models.makers.restore(snapshot.makers);
        this.models.book.restore(snapshot.book);
        this.models.pricing.restore(snapshot.pricing);
        this.models.progress.restore(snapshot.progress);
    }
}
exports.DefaultTexchange = DefaultTexchange;
//# sourceMappingURL=default.js.map