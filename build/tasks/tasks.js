"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const injektor_1 = require("injektor");
class Tasks {
}
__decorate([
    (0, injektor_1.instantInject)(6 /* GetBalancesLike */)
], Tasks.prototype, "getBalances", void 0);
__decorate([
    (0, injektor_1.instantInject)(8 /* GetPositionsLike */)
], Tasks.prototype, "getPositions", void 0);
__decorate([
    (0, injektor_1.instantInject)(14 /* GetAvailableLike */)
], Tasks.prototype, "getAvailable", void 0);
__decorate([
    (0, injektor_1.instantInject)(7 /* GetClosableLike */)
], Tasks.prototype, "getClosable", void 0);
__decorate([
    (0, injektor_1.instantInject)(15 /* SettleLike */)
], Tasks.prototype, "settle", void 0);
__decorate([
    (0, injektor_1.instantInject)(9 /* OrderMakesLike */)
], Tasks.prototype, "orderMakes", void 0);
__decorate([
    (0, injektor_1.instantInject)(11 /* TradeTakesOpenMakersLike */)
], Tasks.prototype, "tradeTakesOpenMakers", void 0);
__decorate([
    (0, injektor_1.instantInject)(10 /* OrderTakesLike */)
], Tasks.prototype, "orderTakes", void 0);
__decorate([
    (0, injektor_1.instantInject)(12 /* ValidateOrderLike */)
], Tasks.prototype, "validateOrder", void 0);
__decorate([
    (0, injektor_1.instantInject)(4 /* MakeOpenOrderLike */)
], Tasks.prototype, "makeOpenOrder", void 0);
__decorate([
    (0, injektor_1.instantInject)(5 /* CancelOpenOrderLike */)
], Tasks.prototype, "cancelOpenOrder", void 0);
__decorate([
    (0, injektor_1.instantInject)(16 /* MarginAccumulationLike */)
], Tasks.prototype, "marginAccumulation", void 0);
__decorate([
    (0, injektor_1.instantInject)(13 /* OrderVolumesLike */)
], Tasks.prototype, "orderVolumes", void 0);
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map