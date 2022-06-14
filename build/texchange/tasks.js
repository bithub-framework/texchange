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
exports.Tasks = void 0;
const types_1 = require("../injection/types");
const injektor_1 = require("@zimtsui/injektor");
let Tasks = class Tasks {
    constructor(getBalances, getPositions, getAvailable, getClosable, settle, orderMakes, tradeTakesOpenMakers, orderTakes, validateOrder, makeOpenOrder, cancelOpenOrder, marginAccumulation, orderVolumes) {
        this.getBalances = getBalances;
        this.getPositions = getPositions;
        this.getAvailable = getAvailable;
        this.getClosable = getClosable;
        this.settle = settle;
        this.orderMakes = orderMakes;
        this.tradeTakesOpenMakers = tradeTakesOpenMakers;
        this.orderTakes = orderTakes;
        this.validateOrder = validateOrder;
        this.makeOpenOrder = makeOpenOrder;
        this.cancelOpenOrder = cancelOpenOrder;
        this.marginAccumulation = marginAccumulation;
        this.orderVolumes = orderVolumes;
    }
};
Tasks = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.TASKS.GetBalances)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.TASKS.GetPositions)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.TASKS.GetAvailable)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.TASKS.GetClosable)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.TASKS.Settle)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.TASKS.OrderMakes)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.TASKS.TradeTakesOpenMakers)),
    __param(7, (0, injektor_1.inject)(types_1.TYPES.TASKS.OrderTakes)),
    __param(8, (0, injektor_1.inject)(types_1.TYPES.TASKS.ValidateOrder)),
    __param(9, (0, injektor_1.inject)(types_1.TYPES.TASKS.MakeOpenOrder)),
    __param(10, (0, injektor_1.inject)(types_1.TYPES.TASKS.CancelOpenOrder)),
    __param(11, (0, injektor_1.inject)(types_1.TYPES.TASKS.MarginAccumulation)),
    __param(12, (0, injektor_1.inject)(types_1.TYPES.TASKS.OrderVolumes))
], Tasks);
exports.Tasks = Tasks;
//# sourceMappingURL=tasks.js.map