"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStages = void 0;
function initializeStages(models) {
    for (const model of models)
        model.initializeStage();
}
exports.initializeStages = initializeStages;
//# sourceMappingURL=initialize-stages.js.map