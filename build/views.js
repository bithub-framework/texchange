"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const instant_1 = require("./views/instant");
const latency_1 = require("./views/latency");
const joystick_1 = require("./views/joystick");
class Views {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
        this.instant = new instant_1.Instant(this.context, this.useCases);
        this.latency = new latency_1.Latency(this.context, this.instant);
        this.joystick = new joystick_1.Joystick(this.context, this.useCases);
    }
}
exports.Views = Views;
//# sourceMappingURL=views.js.map