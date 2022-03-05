"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTasks = void 0;
const make_open_order_1 = require("./tasks/make-open-order");
const cancel_open_order_1 = require("./tasks/cancel-open-order");
const get_available_1 = require("./tasks/get-available");
const get_balances_1 = require("./tasks/get-balances");
const get_closable_1 = require("./tasks/get-closable");
const get_positions_1 = require("./tasks/get-positions");
const order_makes_1 = require("./tasks/order-makes");
const order_takes_1 = require("./tasks/order-takes");
const settle_1 = require("./tasks/settle");
const trade_takes_open_makers_1 = require("./tasks/trade-takes-open-makers");
const validate_order_1 = require("./tasks/validate-order");
class DefaultTasks {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.cancelOpenOrder = new cancel_open_order_1.CancelOpenOrder(this.context, this.models, this.broadcast, this);
        this.getAvailable = new get_available_1.DefaultGetAvailable(this.context, this.models, this.broadcast, this);
        this.getBalances = new get_balances_1.GetBalances(this.context, this.models, this.broadcast, this);
        this.getClosable = new get_closable_1.GetClosable(this.context, this.models, this.broadcast, this);
        this.getPositions = new get_positions_1.GetPositions(this.context, this.models, this.broadcast, this);
        this.makeOpenOrder = new make_open_order_1.MakeOpenOrder(this.context, this.models, this.broadcast, this);
        this.orderMakes = new order_makes_1.OrderMakes(this.context, this.models, this.broadcast, this);
        this.orderTakes = new order_takes_1.OrderTakes(this.context, this.models, this.broadcast, this);
        this.settle = new settle_1.DefaultSettle(this.context, this.models, this.broadcast, this);
        this.tradeTakesOpenMakers = new trade_takes_open_makers_1.TradeTakesOpenMakers(this.context, this.models, this.broadcast, this);
        this.validateOrder = new validate_order_1.ValidateOrder(this.context, this.models, this.broadcast, this);
    }
}
exports.DefaultTasks = DefaultTasks;
//# sourceMappingURL=default-tasks.js.map