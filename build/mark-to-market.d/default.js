"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = void 0;
const startable_1 = require("startable");
const mark_to_market_1 = require("../mark-to-market");
/**
 * 默认永不结算
 */
class DefaultMtm extends mark_to_market_1.Mtm {
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
//# sourceMappingURL=default.js.map