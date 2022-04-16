"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultGetAvailable = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("interfaces");
const get_available_1 = require("./get-available");
class DefaultGetAvailable extends get_available_1.GetAvailable {
    constructor(context, models, broadcast) {
        super(context, models, broadcast);
        this.models = models;
    }
    finalMargin() {
        // 默认无锁仓优惠
        const margin = this.models.margins.getMargin();
        return margin[interfaces_1.Length.LONG]
            .plus(margin[interfaces_1.Length.SHORT]);
    }
    finalFrozenBalance() {
        // 默认单向持仓模式
        const position = this.models.assets.getPosition();
        const totalFrozen = this.models.makers.getTotalFrozen();
        const totalUnfilled = this.models.makers.getTotalUnfilled();
        const $final = {};
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const side = length * interfaces_1.Operation.OPEN;
            const afterDeduction = this.context.H.max(totalUnfilled[side].minus(position[-length]), this.context.H.from(0));
            $final[length] = totalFrozen.balance[length]
                .times(afterDeduction)
                .div(totalUnfilled[side]);
        }
        return $final[interfaces_1.Length.LONG].plus($final[interfaces_1.Length.SHORT]);
    }
}
DefaultGetAvailable.TaskDeps = {};
__decorate([
    (0, injektor_1.inject)(DefaultGetAvailable.TaskDeps)
], DefaultGetAvailable.prototype, "tasks", void 0);
exports.DefaultGetAvailable = DefaultGetAvailable;
//# sourceMappingURL=default.js.map