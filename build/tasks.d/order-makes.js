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
exports.TaskOrderMakes = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let TaskOrderMakes = class TaskOrderMakes {
    constructor(context, models) {
        this.context = context;
        this.models = models;
    }
    orderMakes(order) {
        const makers = this.models.book.getBook()[order.side];
        let behind = new this.context.Data.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        this.models.makers.appendOrder(order, behind);
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.tasks)
], TaskOrderMakes.prototype, "tasks", void 0);
TaskOrderMakes = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.models))
], TaskOrderMakes);
exports.TaskOrderMakes = TaskOrderMakes;
//# sourceMappingURL=order-makes.js.map