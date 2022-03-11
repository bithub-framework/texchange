"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margins = void 0;
const interfaces_1 = require("interfaces");
const model_1 = require("../model");
const big_js_1 = require("big.js");
class Margins extends model_1.Model {
    constructor(context) {
        super();
        this.context = context;
        this.margin = {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        };
    }
    getMargin() {
        return this.margin;
    }
    setMargin(length, margin) {
        this.margin[length] = margin;
    }
    capture() {
        return {
            [interfaces_1.Length.LONG]: this.margin[interfaces_1.Length.LONG].toString(),
            [interfaces_1.Length.SHORT]: this.margin[interfaces_1.Length.SHORT].toString(),
        };
    }
    restore(snapshot) {
        this.margin = {
            [interfaces_1.Length.LONG]: new big_js_1.default(snapshot[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot[interfaces_1.Length.SHORT]),
        };
    }
}
exports.Margins = Margins;
//# sourceMappingURL=margins.js.map