"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultContext = void 0;
const context_1 = require("./context");
const default_1 = require("../context.d/market-calc/default");
class DefaultContext extends context_1.Context {
    constructor() {
        super(...arguments);
        this.calc = new default_1.DefaultMarketCalc();
    }
}
exports.DefaultContext = DefaultContext;
//# sourceMappingURL=default.js.map