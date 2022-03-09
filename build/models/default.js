"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModels = void 0;
const models_static_1 = require("./models-static");
const assets_1 = require("../models.d/assets");
const margin_1 = require("../models.d/margin");
const makers_1 = require("../models.d/makers");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
const pricing_1 = require("../models.d/pricing");
const big_js_1 = require("big.js");
class DefaultModels extends models_static_1.ModelsStatic {
    constructor(context) {
        super();
        this.assets = new assets_1.Assets(context);
        this.margin = new margin_1.DefaultMargin(context);
        this.makers = new makers_1.DefaultMakers(context);
        this.book = new book_1.Book(context);
        this.progress = new progress_1.Progress(context);
        this.pricing = new pricing_1.DefaultPricing(context, new big_js_1.default(0));
    }
}
exports.DefaultModels = DefaultModels;
//# sourceMappingURL=default.js.map