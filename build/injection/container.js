"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("./types");
const credit_assets_1 = require("../models.d/margin-assets/credit-assets/credit-assets");
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
    constructor(vmctx) {
        super();
        this[_a] = this.rcs(credit_assets_1.CreditAssets);
        this[_b] = this.rcs(book_1.Book);
        this[_c] = this.rcs(progress_1.Progress);
        this[_d] = this.rcs(database_trade_handler_1.DatabaseTradeHandler);
        this[_e] = this.rcs(matcher_1.Matcher);
        this[_f] = this.rcs(order_validator_1.OrderValidator);
        this[_g] = this.rcs(broadcast_1.Broadcast);
        this[_h] = this.rcs(make_order_1.UseCaseMakeOrder);
        this[_j] = this.rcs(cancel_order_1.UseCaseCancelOrder);
        this[_k] = this.rcs(amend_order_1.UseCaseAmendOrder);
        this[_l] = this.rcs(get_open_orders_1.UseCaseGetOpenOrders);
        this[_m] = this.rcs(get_positions_1.UseCaseGetPositions);
        this[_o] = this.rcs(get_balances_1.UseCaseGetBalances);
        this[_p] = this.rcs(update_orderbook_1.UseCaseUpdateOrderbook);
        this[_q] = this.rcs(update_trades_1.UseCaseUpdateTrades);
        this[_r] = this.rcs(subscription_1.UseCaseSubscription);
        this[_s] = this.rcs(get_progress_1.UseCaseGetProgress);
        this[_t] = this.rcs(instant_1.Instant);
        this[_u] = this.rcs(user_market_1.UserMarketFacade);
        this[_v] = this.rcs(user_account_1.UserAccountFacade);
        this[_w] = this.rcs(admin_1.AdminFacade);
        this[_x] = this.rcs(texchange_1.Texchange);
        this[types_1.TYPES.vmctx] = this.rv(vmctx);
    }
}
exports.Container = Container;
types_1.TYPES.vmctx, _a = types_1.TYPES.MODELS.creditAssets, _b = types_1.TYPES.MODELS.book, _c = types_1.TYPES.MODELS.progress, _d = types_1.TYPES.MIDDLEWARES.databaseTradeHandler, _e = types_1.TYPES.MIDDLEWARES.matcher, _f = types_1.TYPES.MIDDLEWARES.orderValidator, _g = types_1.TYPES.MIDDLEWARES.broadcast, _h = types_1.TYPES.USE_CASES.makeOrder, _j = types_1.TYPES.USE_CASES.cancelOrder, _k = types_1.TYPES.USE_CASES.amendOrder, _l = types_1.TYPES.USE_CASES.getOpenOrders, _m = types_1.TYPES.USE_CASES.getPositions, _o = types_1.TYPES.USE_CASES.getBalances, _p = types_1.TYPES.USE_CASES.updateOrderbook, _q = types_1.TYPES.USE_CASES.updateTrades, _r = types_1.TYPES.USE_CASES.subscription, _s = types_1.TYPES.USE_CASES.getProgress, _t = types_1.TYPES.FACADES.instant, _u = types_1.TYPES.FACADES.userMarket, _v = types_1.TYPES.FACADES.userAccount, _w = types_1.TYPES.FACADES.admin, _x = types_1.TYPES.texchange;
//# sourceMappingURL=container.js.map