"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const assets_1 = require("../models.d/assets");
const margins_1 = require("../models.d/margins");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
class Models {
    constructor(context) {
        this.assets = new assets_1.Assets(context);
        this.margins = new margins_1.Margins(context);
        this.book = new book_1.Book(context);
        this.progress = new progress_1.Progress(context);
    }
    capture() {
        return {
            assets: this.assets.capture(),
            margins: this.margins.capture(),
            makers: this.makers.capture(),
            book: this.book.capture(),
            pricing: this.pricing.capture(),
            progress: this.progress.capture(),
        };
    }
    restore(snapshot) {
        this.assets.restore(snapshot.assets);
        this.margins.restore(snapshot.margins);
        this.makers.restore(snapshot.makers);
        this.book.restore(snapshot.book);
        this.pricing.restore(snapshot.pricing);
        this.progress.restore(snapshot.progress);
    }
}
exports.Models = Models;
//# sourceMappingURL=models.js.map