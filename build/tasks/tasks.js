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
        this.cancelOpenOrder = new cancel_open_order_1.CancelOpenOrder(context, models, broadcast, this);
        this.getBalances = new get_balances_1.GetBalances(context, models, broadcast, this);
        this.getClosable = new get_closable_1.GetClosable(context, models, broadcast, this);
        this.getPositions = new get_positions_1.GetPositions(context, models, broadcast, this);
        this.makeOpenOrder = new make_open_order_1.MakeOpenOrder(context, models, broadcast, this);
        this.orderMakes = new order_makes_1.OrderMakes(context, models, broadcast, this);
        this.orderTakes = new order_takes_1.OrderTakes(context, models, broadcast, this);
        this.tradeTakesOpenMakers = new trade_takes_open_makers_1.TradeTakesOpenMakers(context, models, broadcast, this);
        this.validateOrder = new validate_order_1.ValidateOrder(context, models, broadcast, this);
        this.orderVolumes = new order_volumes_1.OrderVolumes(context, models, broadcast, this);
    }
}
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map