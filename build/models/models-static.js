"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsStatic = void 0;
class ModelsStatic {
    capture() {
        return {
            assets: this.assets.capture(),
            margin: this.margin.capture(),
            makers: this.makers.capture(),
            book: this.book.capture(),
            pricing: this.pricing.capture(),
            progress: this.progress.capture(),
        };
    }
    restore(snapshot) {
        this.assets.restore(snapshot.assets);
        this.margin.restore(snapshot.margin);
        this.makers.restore(snapshot.makers);
        this.book.restore(snapshot.book);
        this.pricing.restore(snapshot.pricing);
        this.progress.restore(snapshot.progress);
    }
}
exports.ModelsStatic = ModelsStatic;
//# sourceMappingURL=models-static.js.map