"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOpenOrder = void 0;
const injektor_1 = require("injektor");
class CancelOpenOrder {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    cancelOpenOrder(order) {
        const { makers } = this.models;
        let filled;
        try {
            filled = makers.getOrder(order.id).filled;
            makers.forcedlyRemoveOrder(order.id);
        }
        catch (err) {
            filled = order.quantity;
        }
        return {
            ...order,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
}
CancelOpenOrder.TaskDeps = {};
__decorate([
    (0, injektor_1.inject)(CancelOpenOrder.TaskDeps)
], CancelOpenOrder.prototype, "tasks", void 0);
exports.CancelOpenOrder = CancelOpenOrder;
//# sourceMappingURL=cancel-open-order.js.map