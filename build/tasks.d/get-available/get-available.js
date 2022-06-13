"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailable = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
class GetAvailable {
    getAvailable() {
        return this.models.assets.getBalance()
            .minus(this.finalMargin())
            .minus(this.finalFrozenBalance())
            .round(this.context.spec.market.CURRENCY_DP);
    }
}
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.Tasks)
], GetAvailable.prototype, "tasks", void 0);
exports.GetAvailable = GetAvailable;
//# sourceMappingURL=get-available.js.map