"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModels = void 0;
const models_1 = require("./models");
const default_1 = require("../models.d/makers/default");
const default_2 = require("../models.d/pricing/default");
class DefaultModels extends models_1.Models {
    constructor(context) {
        super(context);
        this.makers = new default_1.DefaultMakers(context);
        this.pricing = new default_2.DefaultPricing(context);
    }
}
exports.DefaultModels = DefaultModels;
//# sourceMappingURL=default.js.map