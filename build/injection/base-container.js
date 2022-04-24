"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseContainer = void 0;
const injektor_1 = require("injektor");
// Context
const context_1 = require("../context");
// Models
const models_1 = require("../models");
// Broadcast
const broadcast_1 = require("../broadcast");
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
// UseCases
const use_cases_1 = require("../use-cases");
// Facades
const facades_1 = require("../facades");
// Texchange
const texchange_1 = require("../texchange");
function createBaseContainer(config, timeline, H) {
    const c = new injektor_1.Container();
    c.rfs(context_1.Context, () => new context_1.Context(c.i(3 /* MarketCalc */), config, timeline, H));
    c.rcs(models_1.Models, models_1.Models);
    c.rc(broadcast_1.Broadcast, broadcast_1.Broadcast);
    c.ra(make_open_order_1.MakeOpenOrder.TaskDeps, tasks_1.Tasks);
    c.ra(cancel_open_order_1.CancelOpenOrder.TaskDeps, tasks_1.Tasks);
    c.ra(get_balances_1.GetBalances.TaskDeps, tasks_1.Tasks);
    c.ra(get_closable_1.GetClosable.TaskDeps, tasks_1.Tasks);
    c.ra(get_positions_1.GetPositions.TaskDeps, tasks_1.Tasks);
    c.ra(order_makes_1.OrderMakes.TaskDeps, tasks_1.Tasks);
    c.ra(order_takes_1.OrderTakes.TaskDeps, tasks_1.Tasks);
    c.ra(trade_takes_open_makers_1.TradeTakesOpenMakers.TaskDeps, tasks_1.Tasks);
    c.ra(validate_order_1.ValidateOrder.TaskDeps, tasks_1.Tasks);
    c.ra(order_volumes_1.OrderVolumes.TaskDeps, tasks_1.Tasks);
    c.rcs(4 /* MakeOpenOrderLike */, make_open_order_1.MakeOpenOrder);
    c.rcs(5 /* CancelOpenOrderLike */, cancel_open_order_1.CancelOpenOrder);
    c.rcs(6 /* GetBalancesLike */, get_balances_1.GetBalances);
    c.rcs(7 /* GetClosableLike */, get_closable_1.GetClosable);
    c.rcs(8 /* GetPositionsLike */, get_positions_1.GetPositions);
    c.rcs(9 /* OrderMakesLike */, order_makes_1.OrderMakes);
    c.rcs(10 /* OrderTakesLike */, order_takes_1.OrderTakes);
    c.rcs(11 /* TradeTakesOpenMakersLike */, trade_takes_open_makers_1.TradeTakesOpenMakers);
    c.rcs(12 /* ValidateOrderLike */, validate_order_1.ValidateOrder);
    c.rcs(13 /* OrderVolumesLike */, order_volumes_1.OrderVolumes);
    c.rcs(use_cases_1.UseCases, use_cases_1.UseCases);
    c.rcs(facades_1.Facades, facades_1.Facades);
    c.rfs(17 /* User */, () => c.i(facades_1.Facades).latency);
    c.rfs(18 /* Admin */, () => c.i(facades_1.Facades).joystick);
    c.rcs(texchange_1.Texchange, texchange_1.Texchange);
    return c;
}
exports.createBaseContainer = createBaseContainer;
//# sourceMappingURL=base-container.js.map