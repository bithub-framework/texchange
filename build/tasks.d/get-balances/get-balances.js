"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalances = void 0;
const injektor_1 = require("injektor");
class GetBalances {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    getBalances() {
        return {
            balance: this.models.assets.getBalance(),
            available: this.tasks.getAvailable.getAvailable(),
            time: this.context.timeline.now(),
        };
    }
}
__decorate([
    (0, injektor_1.inject)(GetBalances.TaskDeps)
], GetBalances.prototype, "tasks", void 0);
exports.GetBalances = GetBalances;
(function (GetBalances) {
    GetBalances.TaskDeps = {};
})(GetBalances = exports.GetBalances || (exports.GetBalances = {}));
//# sourceMappingURL=get-balances.js.map