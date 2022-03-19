"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTasks = void 0;
const tasks_1 = require("./tasks");
const default_1 = require("../tasks.d/get-available/default");
const default_2 = require("../tasks.d/settle/default");
const default_3 = require("../tasks.d/margin-accumulation/default");
class DefaultTasks extends tasks_1.Tasks {
    constructor(context, models, broadcast) {
        super(context, models, broadcast);
        this.getAvailable = new default_1.DefaultGetAvailable(context, models, broadcast, this);
        this.settle = new default_2.DefaultSettle(context, models, broadcast, this);
        this.marginAccumulation = new default_3.DefaultMarginAccumulation(context, models, broadcast, this);
    }
}
exports.DefaultTasks = DefaultTasks;
//# sourceMappingURL=default.js.map