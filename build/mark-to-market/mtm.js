"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mtm = void 0;
const startable_1 = require("startable");
class Mtm {
    constructor() {
        this.$s = (0, startable_1.createStartable)(() => this.rawStart(), () => this.rawStop());
    }
}
exports.Mtm = Mtm;
//# sourceMappingURL=mtm.js.map