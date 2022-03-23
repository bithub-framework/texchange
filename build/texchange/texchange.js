"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const startable_1 = require("startable");
const events_1 = require("events");
class Texchange {
    constructor() {
        this.broadcast = new events_1.EventEmitter();
        this.startable = new startable_1.StatefulStartable(() => this.start(), () => this.stop(), () => this.models.capture(), snapshot => this.models.restore(snapshot));
    }
    async start() {
        if (this.mtm)
            await this.mtm.startable.start(this.startable.stop);
    }
    async stop() {
        if (this.mtm)
            await this.mtm.startable.stop();
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=texchange.js.map