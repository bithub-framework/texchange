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
exports.Instant = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let Instant = class Instant {
    constructor(context, useCaseMakeOrder, useCaseCancelOrder, useCaseAmendOrder, useCaseGetOpenOrders, useCaseGetBalances, useCaseGetPositions) {
        this.context = context;
        this.useCaseMakeOrder = useCaseMakeOrder;
        this.useCaseCancelOrder = useCaseCancelOrder;
        this.useCaseAmendOrder = useCaseAmendOrder;
        this.useCaseGetOpenOrders = useCaseGetOpenOrders;
        this.useCaseGetBalances = useCaseGetBalances;
        this.useCaseGetPositions = useCaseGetPositions;
    }
    makeOrders(orders) {
        return orders.map(order => {
            try {
                return this.useCaseMakeOrder.makeOrder(order);
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => this.useCaseCancelOrder.cancelOrder(order));
    }
    amendOrders(amendments) {
        return amendments.map(amendment => {
            try {
                return this.useCaseAmendOrder.amendOrder(amendment);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return this.useCaseGetOpenOrders.getOpenOrders();
    }
    getPositions() {
        return this.useCaseGetPositions.getPositions();
    }
    getBalances() {
        return this.useCaseGetBalances.getBalances();
    }
};
Instant = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.makeOrder)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.cancelOrder)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.amendOrder)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getOpenOrders)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getBalances)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.getPositions))
], Instant);
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map