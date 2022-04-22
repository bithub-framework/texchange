"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOpenOrder = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("interfaces");
class MakeOpenOrder {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
    }
    makeOpenOrder(order) {
        this.tasks.validateOrder.validateOrder(order);
        const $order = this.OpenOrder.copy(order);
        const trades = this.tasks.orderTakes.$orderTakes($order);
        this.tasks.orderMakes.orderMakes($order);
        if (trades.length) {
            this.broadcast.emit('trades', trades);
            this.broadcast.emit('orderbook', this.models.book.getBook());
            this.broadcast.emit('balances', this.tasks.getBalances.getBalances());
            this.broadcast.emit('positions', this.tasks.getPositions.getPositions());
        }
        return $order;
    }
}
MakeOpenOrder.TaskDeps = {};
__decorate([
    (0, injektor_1.instantInject)(MakeOpenOrder.TaskDeps)
], MakeOpenOrder.prototype, "tasks", void 0);
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map