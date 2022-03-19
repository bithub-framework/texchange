"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const startable_1 = require("startable");
const broadcast_1 = require("../broadcast");
class Texchange {
    constructor(config, timeline, H) {
        this.context = {
            config,
            timeline,
            H,
        };
        this.broadcast = new broadcast_1.Broadcast();
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