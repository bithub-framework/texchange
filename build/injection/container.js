"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("./types");
// Context
const context_1 = require("../context");
const data_1 = require("../interfaces/data");
// Models
const models_1 = require("../texchange/models");
const assets_1 = require("../models.d/assets");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
const margins_1 = require("../models.d/margins");
// Broadcast
const broadcast_1 = require("../broadcast");
// Tasks
const tasks_1 = require("../texchange/tasks");
const make_open_order_1 = require("../tasks.d/make-open-order");
const cancel_open_order_1 = require("../tasks.d/cancel-open-order");
const get_balances_1 = require("../tasks.d/get-balances");
const get_closable_1 = require("../tasks.d/get-closable");
const get_positions_1 = require("../tasks.d/get-positions");
const order_makes_1 = require("../tasks.d/order-makes");
const order_takes_1 = require("../tasks.d/order-takes");
const trade_takes_open_makers_1 = require("../tasks.d/trade-takes-open-makers");
const validate_order_1 = require("../tasks.d/validate-order");
const order_volumes_1 = require("../tasks.d/order-volumes");
// UseCases
const use_cases_1 = require("../texchange/use-cases");
const make_order_1 = require("../use-cases.d/make-order");
const cancel_order_1 = require("../use-cases.d/cancel-order");
const amend_order_1 = require("../use-cases.d/amend-order");
const get_open_orders_1 = require("../use-cases.d/get-open-orders");
const get_positions_2 = require("../use-cases.d/get-positions");
const get_balances_2 = require("../use-cases.d/get-balances");
const update_orderbook_1 = require("../use-cases.d/update-orderbook");
const update_trades_1 = require("../use-cases.d/update-trades");
const subscription_1 = require("../use-cases.d/subscription");
const get_progress_1 = require("../use-cases.d/get-progress");
// Facades
const facades_1 = require("../texchange/facades");
const instant_1 = require("../facades.d/user-account/instant");
const admin_1 = require("../facades.d/admin");
const user_market_1 = require("../facades.d/user-market");
const user_account_1 = require("../facades.d/user-account");
// Texchange
const texchange_1 = require("../texchange/texchange");
class Container extends injektor_1.BaseContainer {
    constructor() {
        super(...arguments);
        this[_a] = this.rcs(data_1.DataStatic);
        this[_b] = this.rcs(context_1.Context);
        this[_c] = this.rcs(assets_1.Assets);
        this[_d] = this.rcs(margins_1.Margins);
        this[_e] = this.rcs(book_1.Book);
        this[_f] = this.rcs(progress_1.Progress);
        this[_g] = this.rcs(models_1.Models);
        this[_h] = this.rcs(broadcast_1.Broadcast);
        this[_j] = this.rcs(tasks_1.Tasks);
        this[_k] = this.rcs(make_open_order_1.TaskMakeOpenOrder);
        this[_l] = this.rcs(cancel_open_order_1.TaskCancelOpenOrder);
        this[_m] = this.rcs(get_balances_1.TaskGetBalances);
        this[_o] = this.rcs(get_closable_1.TaskGetClosable);
        this[_p] = this.rcs(get_positions_1.TaskGetPositions);
        this[_q] = this.rcs(order_makes_1.TaskOrderMakes);
        this[_r] = this.rcs(order_takes_1.TaskOrderTakes);
        this[_s] = this.rcs(trade_takes_open_makers_1.TaskTradeTakesOpenMakers);
        this[_t] = this.rcs(validate_order_1.TaskValidateOrder);
        this[_u] = this.rcs(order_volumes_1.TaskOrderVolumes);
        this[_v] = this.rcs(use_cases_1.UseCases);
        this[_w] = this.rcs(make_order_1.UseCaseMakeOrder);
        this[_x] = this.rcs(cancel_order_1.UseCaseCancelOrder);
        this[_y] = this.rcs(amend_order_1.UseCaseAmendOrder);
        this[_z] = this.rcs(get_open_orders_1.UseCaseGetOpenOrders);
        this[_0] = this.rcs(get_positions_2.UseCaseGetPositions);
        this[_1] = this.rcs(get_balances_2.UseCaseGetBalances);
        this[_2] = this.rcs(update_orderbook_1.UseCaseUpdateOrderbook);
        this[_3] = this.rcs(update_trades_1.UseCaseUpdateTrades);
        this[_4] = this.rcs(subscription_1.UseCaseSubscription);
        this[_5] = this.rcs(get_progress_1.UseCaseGetProgress);
        this[_6] = this.rcs(facades_1.Facades);
        this[_7] = this.rcs(instant_1.Instant);
        this[_8] = this.rcs(user_market_1.UserMarketFacade);
        this[_9] = this.rcs(user_account_1.UserAccountFacade);
        this[_10] = this.rcs(admin_1.AdminFacade);
        this[_11] = this.rcs(texchange_1.Texchange);
    }
}
exports.Container = Container;
_a = types_1.TYPES.dataStatic, _b = types_1.TYPES.context, _c = types_1.TYPES.MODELS.assets, _d = types_1.TYPES.MODELS.margins, _e = types_1.TYPES.MODELS.book, _f = types_1.TYPES.MODELS.progress, _g = types_1.TYPES.models, _h = types_1.TYPES.broadcast, _j = types_1.TYPES.tasks, _k = types_1.TYPES.TASKS.makeOpenOrder, _l = types_1.TYPES.TASKS.cancelOpenOrder, _m = types_1.TYPES.TASKS.getBalances, _o = types_1.TYPES.TASKS.getClosable, _p = types_1.TYPES.TASKS.getPositions, _q = types_1.TYPES.TASKS.orderMakes, _r = types_1.TYPES.TASKS.orderTakes, _s = types_1.TYPES.TASKS.tradeTakesOpenMakers, _t = types_1.TYPES.TASKS.validateOrder, _u = types_1.TYPES.TASKS.orderVolumes, _v = types_1.TYPES.useCases, _w = types_1.TYPES.USE_CASES.makeOrder, _x = types_1.TYPES.USE_CASES.cancelOrder, _y = types_1.TYPES.USE_CASES.amendOrder, _z = types_1.TYPES.USE_CASES.getOpenOrders, _0 = types_1.TYPES.USE_CASES.getPositions, _1 = types_1.TYPES.USE_CASES.getBalances, _2 = types_1.TYPES.USE_CASES.updateOrderbook, _3 = types_1.TYPES.USE_CASES.updateTrades, _4 = types_1.TYPES.USE_CASES.subscription, _5 = types_1.TYPES.USE_CASES.getProgress, _6 = types_1.TYPES.facades, _7 = types_1.TYPES.FACADES.instant, _8 = types_1.TYPES.FACADES.userMarket, _9 = types_1.TYPES.FACADES.userAccount, _10 = types_1.TYPES.FACADES.admin, _11 = types_1.TYPES.texchange;
//# sourceMappingURL=container.js.map