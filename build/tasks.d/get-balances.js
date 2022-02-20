"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalances = void 0;
const initialize_stages_1 = require("../initialize-stages");
class GetBalances {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [];
    }
    getBalances() {
        (0, initialize_stages_1.initializeStages)(this.involved);
        return this.controllers.getBalances.getBalances();
    }
}
exports.GetBalances = GetBalances;
//# sourceMappingURL=get-balances.js.map