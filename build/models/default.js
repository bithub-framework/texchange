"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModels = void 0;
const stateful_models_1 = require("./stateful-models");
const assets_1 = require("../models.d/assets");
const margins_1 = require("../models.d/margins");
const makers_1 = require("../models.d/makers");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
const pricing_1 = require("../models.d/pricing");
class DefaultModels extends stateful_models_1.StatefulModels {
    constructor(context) {
        super();
        this.context = context;
        this.assets = new assets_1.Assets(context);
        this.margins = new margins_1.Margins(context);
        this.makers = new makers_1.DefaultMakers(context);
        this.book = new book_1.Book(context);
        this.progress = new progress_1.Progress(context);
        this.pricing = new pricing_1.DefaultPricing(context);
    }
}
exports.DefaultModels = DefaultModels;
//# sourceMappingURL=default.js.map