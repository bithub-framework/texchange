"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const hub_1 = require("./hub");
class Texchange {
    constructor(config, timeline) {
        this.hub = new hub_1.Hub(config, timeline);
    }
    capture() {
        return this.hub.capture();
    }
    restore(backup) {
        this.hub.restore(backup);
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=texchange.js.map