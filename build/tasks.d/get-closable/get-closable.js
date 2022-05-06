"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const secretary_like_1 = require("secretary-like");
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
            [secretary_like_1.Length.LONG]: position[secretary_like_1.Length.LONG]
                .minus(totalFrozen.position[secretary_like_1.Length.LONG]),
            [secretary_like_1.Length.SHORT]: position[secretary_like_1.Length.SHORT]
                .minus(totalFrozen.position[secretary_like_1.Length.SHORT]),
        };
    }
}
exports.GetClosable = GetClosable;
//# sourceMappingURL=get-closable.js.map