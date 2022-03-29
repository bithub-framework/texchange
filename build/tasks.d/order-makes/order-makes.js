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
const interfaces_1 = require("interfaces");
class OrderMakes {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
    }
    orderMakes(order) {
        const $order = {
            ...this.OpenOrder.copy(order),
            behind: this.context.H.from(0),
        };
        const makers = this.models.book.getBook()[order.side];
        for (const maker of makers)
            if (maker.price.eq($order.price))
                // TODO addBehind()
                $order.behind = $order.behind.plus(maker.quantity);
        this.models.makers.appendOrder($order);
    }
}
__decorate([
    (0, injektor_1.inject)(OrderMakes.TaskDeps)
], OrderMakes.prototype, "tasks", void 0);
exports.OrderMakes = OrderMakes;
(function (OrderMakes) {
    OrderMakes.TaskDeps = {};
})(OrderMakes = exports.OrderMakes || (exports.OrderMakes = {}));
//# sourceMappingURL=order-makes.js.map