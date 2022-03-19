"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCases = void 0;
const make_order_1 = require("../use-cases.d/make-order");
const cancel_order_1 = require("../use-cases.d/cancel-order");
const amend_order_1 = require("../use-cases.d/amend-order");
const get_open_orders_1 = require("../use-cases.d/get-open-orders");
const get_positions_1 = require("../use-cases.d/get-positions");
const get_balances_1 = require("../use-cases.d/get-balances");
const update_orderbook_1 = require("../use-cases.d/update-orderbook");
class UseCases {
    constructor(context, models, broadcast, tasks) {
        this.amendOrder = new amend_order_1.AmendOrder(context, models, broadcast, tasks);
        this.cancelOrder = new cancel_order_1.CancelOrder(context, models, broadcast, tasks);
        this.getBalances = new get_balances_1.GetBalances(context, models, broadcast, tasks);
        this.getOpenOrders = new get_open_orders_1.GetOpenOrders(context, models, broadcast, tasks);
        this.getPositions = new get_positions_1.GetPositions(context, models, broadcast, tasks);
        this.makeOrder = new make_order_1.MakeOrder(context, models, broadcast, tasks);
        this.updateOrderbook = new update_orderbook_1.UpdateOrderbook(context, models, broadcast, tasks);
    }
}
exports.UseCases = UseCases;
//# sourceMappingURL=use-cases.js.map