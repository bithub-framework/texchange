"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("./types");
// Context
const context_1 = require("../context");
const assets_1 = require("../models.d/margin-assets/assets/assets");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
// Broadcast
const broadcast_1 = require("../middlewares/broadcast");
const database_trade_handler_1 = require("../middlewares/database-trade-handler");
const matcher_1 = require("../middlewares/matcher");
const order_validator_1 = require("../middlewares/order-validator");
// UseCases
const make_order_1 = require("../use-cases.d/make-order");
const cancel_order_1 = require("../use-cases.d/cancel-order");
const amend_order_1 = require("../use-cases.d/amend-order");
const get_open_orders_1 = require("../use-cases.d/get-open-orders");
const get_positions_1 = require("../use-cases.d/get-positions");
const get_balances_1 = require("../use-cases.d/get-balances");
const update_orderbook_1 = require("../use-cases.d/update-orderbook");
const update_trades_1 = require("../use-cases.d/update-trades");
const subscription_1 = require("../use-cases.d/subscription");
const get_progress_1 = require("../use-cases.d/get-progress");
const instant_1 = require("../facades.d/user-account/instant");
const admin_1 = require("../facades.d/admin");
const user_market_1 = require("../facades.d/user-market");
const user_account_1 = require("../facades.d/user-account");
// Texchange
const texchange_1 = require("../texchange");
class Container extends injektor_1.BaseContainer {
    constructor() {
        super(...arguments);
        this[_a] = this.rcs(context_1.Context);
        this[_b] = this.rcs(assets_1.Assets);
        this[_c] = this.rcs(book_1.Book);
        this[_d] = this.rcs(progress_1.Progress);
        this[_e] = this.rcs(database_trade_handler_1.DatabaseTradeHandler);
        this[_f] = this.rcs(matcher_1.Matcher);
        this[_g] = this.rcs(order_validator_1.OrderValidator);
        this[_h] = this.rcs(broadcast_1.Broadcast);
        this[_j] = this.rcs(make_order_1.UseCaseMakeOrder);
        this[_k] = this.rcs(cancel_order_1.UseCaseCancelOrder);
        this[_l] = this.rcs(amend_order_1.UseCaseAmendOrder);
        this[_m] = this.rcs(get_open_orders_1.UseCaseGetOpenOrders);
        this[_o] = this.rcs(get_positions_1.UseCaseGetPositions);
        this[_p] = this.rcs(get_balances_1.UseCaseGetBalances);
        this[_q] = this.rcs(update_orderbook_1.UseCaseUpdateOrderbook);
        this[_r] = this.rcs(update_trades_1.UseCaseUpdateTrades);
        this[_s] = this.rcs(subscription_1.UseCaseSubscription);
        this[_t] = this.rcs(get_progress_1.UseCaseGetProgress);
        this[_u] = this.rcs(instant_1.Instant);
        this[_v] = this.rcs(user_market_1.UserMarketFacade);
        this[_w] = this.rcs(user_account_1.UserAccountFacade);
        this[_x] = this.rcs(admin_1.AdminFacade);
        this[_y] = this.rcs(texchange_1.Texchange);
    }
}
exports.Container = Container;
_a = types_1.TYPES.context, _b = types_1.TYPES.MODELS.assets, _c = types_1.TYPES.MODELS.book, _d = types_1.TYPES.MODELS.progress, _e = types_1.TYPES.MIDDLEWARES.databaseTradeHandler, _f = types_1.TYPES.MIDDLEWARES.matcher, _g = types_1.TYPES.MIDDLEWARES.orderValidator, _h = types_1.TYPES.MIDDLEWARES.broadcast, _j = types_1.TYPES.USE_CASES.makeOrder, _k = types_1.TYPES.USE_CASES.cancelOrder, _l = types_1.TYPES.USE_CASES.amendOrder, _m = types_1.TYPES.USE_CASES.getOpenOrders, _o = types_1.TYPES.USE_CASES.getPositions, _p = types_1.TYPES.USE_CASES.getBalances, _q = types_1.TYPES.USE_CASES.updateOrderbook, _r = types_1.TYPES.USE_CASES.updateTrades, _s = types_1.TYPES.USE_CASES.subscription, _t = types_1.TYPES.USE_CASES.getProgress, _u = types_1.TYPES.FACADES.instant, _v = types_1.TYPES.FACADES.userMarket, _w = types_1.TYPES.FACADES.userAccount, _x = types_1.TYPES.FACADES.admin, _y = types_1.TYPES.texchange;
//# sourceMappingURL=container.js.map