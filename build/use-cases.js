"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCases = void 0;
const make_order_1 = require("./use-cases.d/make-order");
const cancel_order_1 = require("./use-cases.d/cancel-order");
const amend_order_1 = require("./use-cases.d/amend-order");
const get_open_orders_1 = require("./use-cases.d/get-open-orders");
const get_positions_1 = require("./use-cases.d/get-positions");
const get_balances_1 = require("./use-cases.d/get-balances");
const update_orderbook_1 = require("./use-cases.d/update-orderbook");
const update_trades_1 = require("./use-cases.d/update-trades");
const subscription_1 = require("./use-cases.d/subscription");
const context_1 = require("./context");
const models_1 = require("./models");
const tasks_1 = require("./tasks/tasks");
const injektor_1 = require("injektor");
let UseCases = class UseCases {
    constructor(context, models, broadcast, tasks) {
        this.amendOrder = new amend_order_1.AmendOrder(context, models, broadcast, tasks);
        this.cancelOrder = new cancel_order_1.CancelOrder(context, models, broadcast, tasks);
        this.getBalances = new get_balances_1.GetBalances(context, models, broadcast, tasks);
        this.getOpenOrders = new get_open_orders_1.GetOpenOrders(context, models, broadcast, tasks);
        this.getPositions = new get_positions_1.GetPositions(context, models, broadcast, tasks);
        this.makeOrder = new make_order_1.MakeOrder(context, models, broadcast, tasks);
        this.updateOrderbook = new update_orderbook_1.UpdateOrderbook(context, models, broadcast, tasks);
        this.subscription = new subscription_1.Subscription(context, models, broadcast, tasks);
    }
};
__decorate([
    (0, injektor_1.instantInject)(update_trades_1.UpdateTrades)
], UseCases.prototype, "updateTrades", void 0);
UseCases = __decorate([
    __param(0, (0, injektor_1.inject)(context_1.Context)),
    __param(1, (0, injektor_1.inject)(models_1.Models)),
    __param(2, (0, injektor_1.inject)(14 /* Broadcast */)),
    __param(3, (0, injektor_1.inject)(tasks_1.Tasks))
], UseCases);
exports.UseCases = UseCases;
//# sourceMappingURL=use-cases.js.map