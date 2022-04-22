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
exports.Facades = void 0;
const instant_1 = require("./facades.d/instant");
const latency_1 = require("./facades.d/latency");
const joystick_1 = require("./facades.d/joystick");
const context_1 = require("./context");
const use_cases_1 = require("./use-cases");
const injektor_1 = require("injektor");
let Facades = class Facades {
    constructor(context, useCases) {
        this.instant = new instant_1.Instant(context, useCases);
        this.latency = new latency_1.Latency(context, useCases, this.instant);
        this.joystick = new joystick_1.Joystick(context, useCases);
    }
};
Facades = __decorate([
    __param(0, (0, injektor_1.inject)(context_1.Context)),
    __param(1, (0, injektor_1.inject)(use_cases_1.UseCases))
], Facades);
exports.Facades = Facades;
//# sourceMappingURL=facades.js.map