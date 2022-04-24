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
exports.Tasks = void 0;
const context_1 = require("../context");
const models_1 = require("../models");
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
const injektor_1 = require("injektor");
let Tasks = class Tasks {
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
};
Tasks = __decorate([
    __param(0, (0, injektor_1.inject)(context_1.Context)),
    __param(1, (0, injektor_1.inject)(models_1.Models)),
    __param(2, (0, injektor_1.inject)(broadcast_1.Broadcast))
], Tasks);
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map