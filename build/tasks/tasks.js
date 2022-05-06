"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
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
class Tasks {
    constructor(context, models, broadcast) {
        this.getBalances = new get_balances_1.GetBalances(this, context, models, broadcast);
        this.getPositions = new get_positions_1.GetPositions(this, context, models, broadcast);
        this.getClosable = new get_closable_1.GetClosable(this, context, models, broadcast);
        this.orderMakes = new order_makes_1.OrderMakes(this, context, models, broadcast);
        this.tradeTakesOpenMakers = new trade_takes_open_makers_1.TradeTakesOpenMakers(this, context, models, broadcast);
        this.orderTakes = new order_takes_1.OrderTakes(this, context, models, broadcast);
        this.validateOrder = new validate_order_1.ValidateOrder(this, context, models, broadcast);
        this.makeOpenOrder = new make_open_order_1.MakeOpenOrder(this, context, models, broadcast);
        this.cancelOpenOrder = new cancel_open_order_1.CancelOpenOrder(this, context, models, broadcast);
        this.orderVolumes = new order_volumes_1.OrderVolumes(this, context, models, broadcast);
    }
}
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map