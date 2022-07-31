"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mtm = void 0;
const startable_1 = require("startable");
class Mtm {
    constructor() {
        this.startable = (0, startable_1.createStartable)(() => this.rawStart(), () => this.rawStop());
        this.start = this.startable.start;
        this.stop = this.startable.stop;
        this.assart = this.startable.assart;
        this.starp = this.startable.starp;
        this.getReadyState = this.startable.getReadyState;
        this.skipStart = this.startable.skipStart;
    }
}
exports.Mtm = Mtm;
//# sourceMappingURL=mtm.js.map