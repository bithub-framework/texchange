"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const interfaces_1 = require("interfaces");
class GetClosable {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
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