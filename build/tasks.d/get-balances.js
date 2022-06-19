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
exports.TaskGetBalances = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let TaskGetBalances = class TaskGetBalances {
    constructor(context, models) {
        this.context = context;
        this.models = models;
    }
    getBalances() {
        return {
            balance: this.models.assets.getBalance(),
            available: this.tasks.getAvailable.getAvailable(),
            time: this.context.timeline.now(),
        };
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.tasks)
], TaskGetBalances.prototype, "tasks", void 0);
TaskGetBalances = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.models))
], TaskGetBalances);
exports.TaskGetBalances = TaskGetBalances;
//# sourceMappingURL=get-balances.js.map