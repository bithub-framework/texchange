"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const types_1 = require("../injection/types");
const injektor_1 = require("@zimtsui/injektor");
class Tasks {
    constructor() {
        // this.getBalances = new GetBalances(context, models, broadcast, this);
        // this.getPositions = new GetPositions(context, models, broadcast, this);
        // this.getClosable = new GetClosable(context, models, broadcast, this);
        // this.orderMakes = new OrderMakes(context, models, broadcast, this);
        // this.tradeTakesOpenMakers = new TradeTakesOpenMakers(context, models, broadcast, this);
        // this.orderTakes = new OrderTakes(context, models, broadcast, this);
        // this.validateOrder = new ValidateOrder(context, models, broadcast, this);
        // this.makeOpenOrder = new MakeOpenOrder(context, models, broadcast, this);
        // this.cancelOpenOrder = new CancelOpenOrder(context, models, broadcast, this);
        // this.orderVolumes = new OrderVolumes(context, models, broadcast, this);
    }
}
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.GetBalances)
], Tasks.prototype, "getBalances", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.GetPositions)
], Tasks.prototype, "getPositions", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.GetAvailable)
], Tasks.prototype, "getAvailable", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.GetClosable)
], Tasks.prototype, "getClosable", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.Settle)
], Tasks.prototype, "settle", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.OrderMakes)
], Tasks.prototype, "orderMakes", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.TradeTakesOpenMakers)
], Tasks.prototype, "tradeTakesOpenMakers", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.OrderTakes)
], Tasks.prototype, "orderTakes", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.ValidateOrder)
], Tasks.prototype, "validateOrder", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.MakeOpenOrder)
], Tasks.prototype, "makeOpenOrder", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.CancelOpenOrder)
], Tasks.prototype, "cancelOpenOrder", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.MarginAccumulation)
], Tasks.prototype, "marginAccumulation", void 0);
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.TASKS.OrderVolumes)
], Tasks.prototype, "orderVolumes", void 0);
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map