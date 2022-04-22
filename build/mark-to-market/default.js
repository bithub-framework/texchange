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
exports.DefaultMtm = void 0;
const startable_1 = require("startable");
const context_1 = require("../context");
const mtm_1 = require("./mtm");
const injektor_1 = require("injektor");
/**
 * 默认永不结算
 */
let DefaultMtm = class DefaultMtm extends mtm_1.Mtm {
    constructor(context, models, broadcast, tasks) {
        super(context, models, broadcast, tasks);
        this.models = models;
        this.tasks = tasks;
        this.startable = startable_1.Startable.create(() => this.start(), () => this.stop());
    }
    async start() { }
    async stop() { }
};
DefaultMtm = __decorate([
    __param(0, (0, injektor_1.inject)(context_1.Context)),
    __param(1, (0, injektor_1.inject)(DefaultMtm.ModelDeps)),
    __param(2, (0, injektor_1.inject)(14 /* Broadcast */)),
    __param(3, (0, injektor_1.inject)(DefaultMtm.TaskDeps))
], DefaultMtm);
exports.DefaultMtm = DefaultMtm;
(function (DefaultMtm) {
    DefaultMtm.ModelDeps = {};
    DefaultMtm.TaskDeps = {};
})(DefaultMtm = exports.DefaultMtm || (exports.DefaultMtm = {}));
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=default.js.map