"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const startable_1 = require("startable");
const injektor_1 = require("injektor");
const events_1 = require("events");
// Context
const context_1 = require("../context");
const models_1 = require("../models");
// Tasks
const make_open_order_1 = require("../tasks.d/make-open-order/make-open-order");
const cancel_open_order_1 = require("../tasks.d/cancel-open-order/cancel-open-order");
const get_balances_1 = require("../tasks.d/get-balances/get-balances");
const get_closable_1 = require("../tasks.d/get-closable/get-closable");
const get_positions_1 = require("../tasks.d/get-positions/get-positions");
const order_makes_1 = require("../tasks.d/order-makes/order-makes");
const order_takes_1 = require("../tasks.d/order-takes/order-takes");
const trade_takes_open_makers_1 = require("../tasks.d/trade-takes-open-makers/trade-takes-open-makers");
const validate_order_1 = require("../tasks.d/validate-order/validate-order");
const order_volumes_1 = require("../tasks.d/order-volumes/order-volumes");
const tasks_1 = require("../tasks/tasks");
// Mark to market
const mtm_1 = require("../mark-to-market/mtm");
// UseCases
const use_cases_1 = require("../use-cases");
// Facades
const facades_1 = require("../facades");
class Texchange {
    constructor(config, timeline, H) {
        this.c = new injektor_1.Container();
        this.broadcast = new events_1.EventEmitter();
        this.c.rfs(context_1.Context, () => new context_1.Context(config, timeline, H));
        this.c.rcs(models_1.Models, models_1.Models);
        this.c.rv(14 /* Broadcast */, this.broadcast);
        this.c.ra(make_open_order_1.MakeOpenOrder.TaskDeps, tasks_1.Tasks);
        this.c.ra(cancel_open_order_1.CancelOpenOrder.TaskDeps, tasks_1.Tasks);
        this.c.ra(get_balances_1.GetBalances.TaskDeps, tasks_1.Tasks);
        this.c.ra(get_closable_1.GetClosable.TaskDeps, tasks_1.Tasks);
        this.c.ra(get_positions_1.GetPositions.TaskDeps, tasks_1.Tasks);
        this.c.ra(order_makes_1.OrderMakes.TaskDeps, tasks_1.Tasks);
        this.c.ra(order_takes_1.OrderTakes.TaskDeps, tasks_1.Tasks);
        this.c.ra(trade_takes_open_makers_1.TradeTakesOpenMakers.TaskDeps, tasks_1.Tasks);
        this.c.ra(validate_order_1.ValidateOrder.TaskDeps, tasks_1.Tasks);
        this.c.ra(order_volumes_1.OrderVolumes.TaskDeps, tasks_1.Tasks);
        this.c.rcs(1 /* MakeOpenOrderLike */, make_open_order_1.MakeOpenOrder);
        this.c.rcs(2 /* CancelOpenOrderLike */, cancel_open_order_1.CancelOpenOrder);
        this.c.rcs(3 /* GetBalancesLike */, get_balances_1.GetBalances);
        this.c.rcs(4 /* GetClosableLike */, get_closable_1.GetClosable);
        this.c.rcs(5 /* GetPositionsLike */, get_positions_1.GetPositions);
        this.c.rcs(6 /* OrderMakesLike */, order_makes_1.OrderMakes);
        this.c.rcs(7 /* OrderTakesLike */, order_takes_1.OrderTakes);
        this.c.rcs(8 /* TradeTakesOpenMakersLike */, trade_takes_open_makers_1.TradeTakesOpenMakers);
        this.c.rcs(9 /* ValidateOrderLike */, validate_order_1.ValidateOrder);
        this.c.rcs(10 /* OrderVolumesLike */, order_volumes_1.OrderVolumes);
        this.c.rcs(use_cases_1.UseCases, use_cases_1.UseCases);
        this.c.rcs(facades_1.Facades, facades_1.Facades);
        this.c.rfs(15 /* User */, () => this.c.i(facades_1.Facades).latency);
        this.c.rfs(16 /* Admin */, () => this.c.i(facades_1.Facades).joystick);
        this.startable = startable_1.Startable.create(() => this.start(), () => this.stop());
    }
    async start() {
        if (this.mtm)
            await this.mtm.startable.start(this.startable.stop);
    }
    async stop() {
        if (this.mtm)
            await this.mtm.startable.stop();
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
__decorate([
    (0, injektor_1.instantInject)(models_1.Models)
], Texchange.prototype, "models", void 0);
__decorate([
    (0, injektor_1.instantInject)(mtm_1.Mtm)
], Texchange.prototype, "mtm", void 0);
__decorate([
    (0, injektor_1.instantInject)(15 /* User */)
], Texchange.prototype, "user", void 0);
__decorate([
    (0, injektor_1.instantInject)(16 /* Admin */)
], Texchange.prototype, "admin", void 0);
exports.Texchange = Texchange;
//# sourceMappingURL=texchange.js.map