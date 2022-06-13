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
exports.MakeOpenOrder = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let MakeOpenOrder = class MakeOpenOrder {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    makeOpenOrder(order) {
        this.tasks.validateOrder.validateOrder(order);
        const $order = this.context.Data.OpenOrder.copy(order);
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
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.Tasks)
], MakeOpenOrder.prototype, "tasks", void 0);
MakeOpenOrder = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast))
], MakeOpenOrder);
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map