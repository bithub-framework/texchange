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
exports.TaskValidateOrder = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let TaskValidateOrder = class TaskValidateOrder {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    validateOrder(order) {
        this.validateFormat(order);
        this.validateQuantity(order);
    }
    validateQuantity(order) {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder(order, new this.context.Data.H(0));
        try {
            const enoughPosition = closable[secretary_like_1.Length.LONG].gte(0) &&
                closable[secretary_like_1.Length.SHORT].gte(0);
            assert(enoughPosition);
            const enoughBalance = this.tasks.getAvailable.getAvailable()
                .gte(this.context.calc.dollarVolume(order.price, order.unfilled).times(Math.max(this.context.spec.account.TAKER_FEE_RATE, 0)).round(this.context.spec.market.CURRENCY_DP));
            assert(enoughBalance);
        }
        finally {
            makers.removeOrder(order.id);
        }
    }
    validateFormat(order) {
        assert(order.price.eq(order.price.round(this.context.spec.market.PRICE_DP)));
        assert(order.price.mod(this.context.spec.market.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.context.spec.market.QUANTITY_DP)));
        assert(order.length === secretary_like_1.Length.LONG || order.length === secretary_like_1.Length.SHORT);
        assert(order.operation === secretary_like_1.Operation.OPEN || order.operation === secretary_like_1.Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.Tasks)
], TaskValidateOrder.prototype, "tasks", void 0);
TaskValidateOrder = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast))
], TaskValidateOrder);
exports.TaskValidateOrder = TaskValidateOrder;
//# sourceMappingURL=validate-order.js.map