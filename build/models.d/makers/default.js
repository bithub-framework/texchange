"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMakers = void 0;
const secretary_like_1 = require("secretary-like");
const frozen_balance_1 = require("../../interfaces/frozen/frozen-balance");
const makers_1 = require("./makers");
const injektor_1 = require("@zimtsui/injektor");
let DefaultMakers = class DefaultMakers extends makers_1.Makers {
    // 默认单向持仓模式
    toFreeze(order) {
        if (order.action === secretary_like_1.Action.OPEN) {
            const balance = new frozen_balance_1.FrozenBalance(this.context.Data.H.from(0), this.context.Data.H.from(0));
            balance.set(order.length, this.marketSpec.dollarVolume(order.price, order.unfilled));
            balance.set(secretary_like_1.Length.invert(order.length), this.context.Data.H.from(0));
            return {
                balance,
                position: this.context.Data.Frozen.ZERO.position,
            };
        }
        else {
            const position = new secretary_like_1.Position(this.context.Data.H.from(0), this.context.Data.H.from(0));
            position.set(order.length, order.unfilled);
            position.set(secretary_like_1.Length.invert(order.length), this.context.Data.H.from(0));
            return {
                balance: this.context.Data.Frozen.ZERO.balance,
                position: position,
            };
        }
    }
};
DefaultMakers = __decorate([
    (0, injektor_1.injextends)()
], DefaultMakers);
exports.DefaultMakers = DefaultMakers;
//# sourceMappingURL=default.js.map