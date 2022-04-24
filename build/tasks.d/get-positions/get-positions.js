"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPositions = void 0;
class GetPositions {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    getPositions() {
        return {
            position: this.models.assets.getPosition(),
            closable: this.tasks.getClosable.getClosable(),
            time: this.context.timeline.now(),
        };
    }
}
exports.GetPositions = GetPositions;
//# sourceMappingURL=get-positions.js.map