"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTexchange = void 0;
const texchange_1 = require("./texchange");
const default_1 = require("../context/default");
const default_2 = require("../mark-to-market/default");
const default_3 = require("../models/default");
const default_4 = require("../tasks/default");
const default_5 = require("../use-cases/default");
const views_1 = require("../views");
class DefaultTexchange extends texchange_1.Texchange {
    constructor(config, timeline, H) {
        super();
        this.context = new default_1.DefaultContext(config, timeline, H);
        this.models = new default_3.DefaultModels(this.context);
        this.tasks = new default_4.DefaultTasks(this.context, this.models, this.broadcast);
        this.mtm = new default_2.DefaultMtm(this.context, this.models, this.tasks);
        this.useCases = new default_5.DefaultUseCases(this.context, this.models, this.broadcast, this.tasks);
        this.views = new views_1.Views(this.context, this.useCases);
        this.latency = this.views.latency;
        this.joystick = this.views.joystick;
    }
}
exports.DefaultTexchange = DefaultTexchange;
//# sourceMappingURL=default.js.map