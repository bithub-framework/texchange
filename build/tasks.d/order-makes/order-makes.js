"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMakes = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("../../interfaces");
class OrderMakes {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.OrderId = new interfaces_1.OrderIdStatic();
        this.OpenOrder = new interfaces_1.OpenOrderStatic(this.context.H, this.OrderId);
    }
    orderMakes(order) {
        const makers = this.models.book.getBook()[order.side];
        let behind = new this.context.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        this.models.makers.appendOrder(order, behind);
    }
}
OrderMakes.TaskDeps = {};
__decorate([
    (0, injektor_1.instantInject)(OrderMakes.TaskDeps)
], OrderMakes.prototype, "tasks", void 0);
exports.OrderMakes = OrderMakes;
//# sourceMappingURL=order-makes.js.map