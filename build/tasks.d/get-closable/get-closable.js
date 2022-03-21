"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const interfaces_1 = require("interfaces");
const task_1 = require("../../task");
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
        const totalFrozen = makers.getTotalFrozen();
        const position = assets.getPosition();
        return {
            [interfaces_1.Length.LONG]: position[interfaces_1.Length.LONG]
                .minus(totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: position[interfaces_1.Length.SHORT]
                .minus(totalFrozen.position[interfaces_1.Length.SHORT]),
        };
    }
}
exports.GetClosable = GetClosable;
//# sourceMappingURL=get-closable.js.map