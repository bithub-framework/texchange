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
exports.DefaultTasks = void 0;
const tasks_1 = require("./tasks");
const injektor_1 = require("injektor");
const types_1 = require("../injection/types");
const default_1 = require("../tasks.d/get-available/default");
const default_2 = require("../tasks.d/margin-accumulation/default");
const default_3 = require("../tasks.d/settle/default");
let DefaultTasks = class DefaultTasks extends tasks_1.Tasks {
    constructor(context, models, broadcast) {
        super(context, models, broadcast);
        this.getAvailable = new default_1.DefaultGetAvailable(this, context, models, broadcast);
        this.settle = new default_3.DefaultSettle(this, context, models, broadcast);
        this.marginAccumulation = new default_2.DefaultMarginAccumulation(this, context, models, broadcast);
    }
};
DefaultTasks = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast))
], DefaultTasks);
exports.DefaultTasks = DefaultTasks;
//# sourceMappingURL=default.js.map