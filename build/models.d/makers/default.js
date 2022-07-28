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
const makers_1 = require("./makers");
const injektor_1 = require("@zimtsui/injektor");
let DefaultMakers = class DefaultMakers extends makers_1.Makers {
    // 默认单向持仓模式
    toFreeze(order) {
        // @ts-ignore
        console.log(order.price.toJSON());
        // @ts-ignore
        console.log(order.unfilled.toJSON());
        if (order.action === secretary_like_1.Action.OPEN) {
            const balance = {
                [secretary_like_1.Length.LONG]: this.context.dataTypes.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.context.dataTypes.hFactory.from(0),
            };
            balance[order.length] = this.marketSpec.dollarVolume(order.price, order.unfilled);
            balance[secretary_like_1.Length.invert(order.length)] = this.context.dataTypes.hFactory.from(0);
            return {
                balance,
                position: this.context.dataTypes.Frozen.ZERO.position,
            };
        }
        else {
            const position = {
                [secretary_like_1.Length.LONG]: this.context.dataTypes.hFactory.from(0),
                [secretary_like_1.Length.SHORT]: this.context.dataTypes.hFactory.from(0),
            };
            position[order.length] = order.unfilled;
            position[secretary_like_1.Length.invert(order.length)] = this.context.dataTypes.hFactory.from(0);
            return {
                balance: this.context.dataTypes.Frozen.ZERO.balance,
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