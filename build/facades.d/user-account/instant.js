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
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
    }
    makeOrders(orders) {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }
    amendOrders(amendments) {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return this.useCases.getOpenOrders.getOpenOrders();
    }
    getPositions() {
        return this.useCases.getPositions.getPositions();
    }
    getBalances() {
        return this.useCases.getBalances.getBalances();
    }
};
Instant = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.UseCases))
], Instant);
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map