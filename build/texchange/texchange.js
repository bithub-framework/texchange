"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const startable_1 = require("startable");
class Texchange {
    constructor() {
        this.startable = startable_1.Startable.create(() => this.start(), () => this.stop());
    }
    async start() {
        if (this.mtm)
            await this.mtm.startable.start(this.startable.stop);
    }
    async stop() {
        if (this.mtm)
            await this.mtm.startable.stop();
    }
    capture() {
        return {
            assets: this.models.assets.capture(),
            margins: this.models.margins.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            pricing: this.models.pricing.capture(),
            progress: this.models.progress.capture(),
        };
    }
    restore(snapshot) {
        this.models.assets.restore(snapshot.assets);
        this.models.margins.restore(snapshot.margins);
        this.models.makers.restore(snapshot.makers);
        this.models.book.restore(snapshot.book);
        this.models.pricing.restore(snapshot.pricing);
        this.models.progress.restore(snapshot.progress);
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=texchange.js.map