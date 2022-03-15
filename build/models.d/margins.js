"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margins = void 0;
const interfaces_1 = require("interfaces");
const model_1 = require("../model");
class Margins extends model_1.Model {
    constructor(context) {
        super();
        this.context = context;
        this.margin = {
            [interfaces_1.Length.LONG]: this.context.H.from(0),
            [interfaces_1.Length.SHORT]: this.context.H.from(0),
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
            [interfaces_1.Length.LONG]: this.context.H.capture(this.margin[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.context.H.capture(this.margin[interfaces_1.Length.SHORT]),
        };
    }
    restore(snapshot) {
        this.margin = {
            [interfaces_1.Length.LONG]: this.context.H.restore(snapshot[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.context.H.restore(snapshot[interfaces_1.Length.SHORT]),
        };
    }
}
exports.Margins = Margins;
//# sourceMappingURL=margins.js.map