"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPositions = void 0;
const interfaces_1 = require("../interfaces");
const initialize_stages_1 = require("../initialize-stages");
class GetPositions {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [];
    }
    getPositions() {
        (0, initialize_stages_1.initializeStages)(this.involved);
        return {
            position: {
                [interfaces_1.Length.LONG]: this.models.assets.position[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.models.assets.position[interfaces_1.Length.SHORT],
            },
            closable: this.controllers.getClosable.getClosable(),
            time: this.context.timeline.now(),
        };
    }
}
exports.GetPositions = GetPositions;
//# sourceMappingURL=get-positions.js.map