"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTexchange = void 0;
const texchange_1 = require("./texchange");
const startable_1 = require("startable");
const mark_to_market_1 = require("../mark-to-market");
const models_1 = require("../models");
const broadcast_1 = require("../broadcast");
const tasks_1 = require("../tasks");
const use_cases_1 = require("../use-cases");
const views_1 = require("../views");
class DefaultTexchange extends texchange_1.Texchange {
    constructor(config, timeline, H) {
        super();
        this.context = {
            config,
            timeline,
            H,
        };
        this.models = new models_1.DefaultModels(this.context);
        this.broadcast = new broadcast_1.Broadcast();
        this.tasks = new tasks_1.DefaultTasks(this.context, this.models, this.broadcast);
        this.mtm = new mark_to_market_1.DefaultMtm(this.context, this.models, this.tasks);
        this.useCases = new use_cases_1.DefaultUseCases(this.context, this.models, this.broadcast, this.tasks);
        this.views = new views_1.Views(this.context, this.useCases);
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
exports.DefaultTexchange = DefaultTexchange;
//# sourceMappingURL=default.js.map