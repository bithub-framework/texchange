"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const interfaces_1 = require("interfaces");
const task_1 = require("../task");
class GetClosable extends task_1.Task {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getClosable() {
        const { assets, makers } = this.models;
        return {
            [interfaces_1.Length.LONG]: assets.getPosition()[interfaces_1.Length.LONG]
                .minus(makers.totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.getPosition()[interfaces_1.Length.SHORT]
                .minus(makers.totalFrozen.position[interfaces_1.Length.SHORT]),
        };
    }
}
exports.GetClosable = GetClosable;
//# sourceMappingURL=get-closable.js.map