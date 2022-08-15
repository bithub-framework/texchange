"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broadcast = void 0;
const events_1 = require("events");
class Broadcast extends events_1.EventEmitter {
    constructor() {
        super();
        this.on('error', () => { });
    }
}
exports.Broadcast = Broadcast;
//# sourceMappingURL=broadcast.js.map