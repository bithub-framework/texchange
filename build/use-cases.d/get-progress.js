"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProgress = void 0;
class GetProgress {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getLatestDatabaseOrderbookId() {
        return this.models.progress.getLatestDatabaseOrderbookId();
    }
    getLatestDatabaseTradeId() {
        return this.models.progress.getLatestDatabaseTradeId();
    }
}
exports.GetProgress = GetProgress;
//# sourceMappingURL=get-progress.js.map