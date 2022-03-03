"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = exports.Mtm = void 0;
const startable_1 = require("startable");
class Mtm {
}
exports.Mtm = Mtm;
// 默认永不结算
class DefaultMtm extends Mtm {
    constructor(context, models, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.tasks = tasks;
        this.startable = new startable_1.Startable(() => this.start(), () => this.stop());
    }
    async start() { }
    async stop() { }
}
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=mark-to-market.js.map