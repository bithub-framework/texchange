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
exports.DefaultTaskGetAvailable = void 0;
const secretary_like_1 = require("secretary-like");
const get_available_1 = require("./get-available");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/default/types");
let DefaultTaskGetAvailable = class DefaultTaskGetAvailable extends get_available_1.TaskGetAvailable {
    constructor(context, marketSpec, models, broadcast) {
        super();
        this.context = context;
        this.marketSpec = marketSpec;
        this.models = models;
        this.broadcast = broadcast;
    }
    finalMargin() {
        // 默认无锁仓优惠
        const margin = this.models.margins.getMargin();
        return margin[secretary_like_1.Length.LONG]
            .plus(margin[secretary_like_1.Length.SHORT]);
    }
    finalFrozenBalance() {
        // 默认单向持仓模式
        const position = this.models.assets.getPosition();
        const totalFrozen = this.models.makers.getTotalFrozen();
        const totalUnfilled = this.models.makers.getTotalUnfilled();
        const $final = {};
        for (const length of [secretary_like_1.Length.LONG, secretary_like_1.Length.SHORT]) {
            const side = length * secretary_like_1.Operation.OPEN;
            const afterDeduction = this.context.Data.H.max(totalUnfilled[side].minus(position[-length]), new this.context.Data.H(0));
            $final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilled[side]);
        }
        return $final[secretary_like_1.Length.LONG].plus($final[secretary_like_1.Length.SHORT]);
    }
};
DefaultTaskGetAvailable = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.models)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.broadcast))
], DefaultTaskGetAvailable);
exports.DefaultTaskGetAvailable = DefaultTaskGetAvailable;
//# sourceMappingURL=default.js.map