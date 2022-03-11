"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPositions = void 0;
const interfaces_1 = require("interfaces");
const task_1 = require("../task");
class GetPositions extends task_1.Task {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getPositions() {
        return {
            position: {
                [interfaces_1.Length.LONG]: this.models.assets.getPosition()[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.models.assets.getPosition()[interfaces_1.Length.SHORT],
            },
            closable: this.tasks.getClosable.getClosable(),
            time: this.context.timeline.now(),
        };
    }
}
exports.GetPositions = GetPositions;
//# sourceMappingURL=get-positions.js.map