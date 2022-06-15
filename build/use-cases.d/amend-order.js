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
exports.UseCaseAmendOrder = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCaseAmendOrder = class UseCaseAmendOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    amendOrder(amendment) {
        const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
        const newOrder = {
            ...oldOrder,
            price: amendment.newPrice,
            unfilled: amendment.newUnfilled,
            quantity: amendment.newUnfilled.plus(oldOrder.filled),
        };
        this.tasks.validateOrder.validateOrder(newOrder);
        return this.tasks.makeOpenOrder.makeOpenOrder(newOrder);
    }
};
UseCaseAmendOrder = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.broadcast)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.tasks))
], UseCaseAmendOrder);
exports.UseCaseAmendOrder = UseCaseAmendOrder;
//# sourceMappingURL=amend-order.js.map