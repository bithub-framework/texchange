"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPositions = void 0;
const use_case_1 = require("./use-case");
const interfaces_1 = require("interfaces");
class GetPositions extends use_case_1.UseCase {
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
                [interfaces_1.Length.LONG]: this.models.assets.position[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.models.assets.position[interfaces_1.Length.SHORT],
            },
            closable: this.tasks.getClosable.getClosable(),
            time: this.context.timeline.now(),
        };
    }
}
exports.GetPositions = GetPositions;
//# sourceMappingURL=get-positions.js.map