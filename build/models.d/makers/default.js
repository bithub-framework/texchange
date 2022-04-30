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
exports.DefaultMakers = void 0;
const interfaces_1 = require("interfaces");
const context_1 = require("../../context");
const makers_1 = require("./makers");
const injektor_1 = require("injektor");
let DefaultMakers = class DefaultMakers extends makers_1.Makers {
    constructor(context) { super(context); }
    /**
     * 默认单向持仓模式
     */
    toFreeze(order) {
        if (order.operation === interfaces_1.Operation.OPEN)
            return {
                balance: {
                    [order.length]: this.context.calc.dollarVolume(order.price, order.unfilled),
                    [-order.length]: new this.context.Data.H(0),
                },
                position: this.context.Data.Frozen.ZERO.position,
            };
        else
            return {
                balance: this.context.Data.Frozen.ZERO.balance,
                position: {
                    [order.length]: order.unfilled,
                    [-order.length]: new this.context.Data.H(0),
                },
            };
    }
};
DefaultMakers = __decorate([
    __param(0, (0, injektor_1.inject)(context_1.Context))
], DefaultMakers);
exports.DefaultMakers = DefaultMakers;
//# sourceMappingURL=default.js.map