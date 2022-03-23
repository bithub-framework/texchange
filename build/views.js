"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const instant_1 = require("./views.d/instant");
const latency_1 = require("./views.d/latency");
const joystick_1 = require("./views.d/joystick");
class Views {
    constructor(context, useCases) {
        this.instant = new instant_1.Instant(context, useCases);
        this.latency = new latency_1.Latency(context, useCases, this.instant);
        this.joystick = new joystick_1.Joystick(context, useCases);
    }
}
exports.Views = Views;
//# sourceMappingURL=views.js.map