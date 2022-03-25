"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margins = void 0;
const interfaces_1 = require("interfaces");
class Margins {
    constructor(context) {
        this.context = context;
        this.Margin = new Margins.MarginStatic(this.context.H);
        this.$margin = {
            [interfaces_1.Length.LONG]: this.context.H.from(0),
            [interfaces_1.Length.SHORT]: this.context.H.from(0),
        };
    }
    getMargin() {
        return this.Margin.copy(this.$margin);
    }
    setMargin(length, marginNumber) {
        this.$margin[length] = marginNumber;
    }
    capture() {
        return this.Margin.capture(this.$margin);
    }
    restore(snapshot) {
        this.$margin = this.Margin.restore(snapshot);
    }
}
exports.Margins = Margins;
(function (Margins) {
    class MarginStatic {
        constructor(H) {
            this.H = H;
        }
        capture(margin) {
            return {
                [interfaces_1.Length.LONG]: this.H.capture(margin[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.capture(margin[interfaces_1.Length.SHORT]),
            };
        }
        restore(snapshot) {
            return {
                [interfaces_1.Length.LONG]: this.H.restore(snapshot[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.restore(snapshot[interfaces_1.Length.SHORT]),
            };
        }
        copy(margin) {
            return {
                [interfaces_1.Length.LONG]: margin[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: margin[interfaces_1.Length.SHORT],
            };
        }
    }
    Margins.MarginStatic = MarginStatic;
})(Margins = exports.Margins || (exports.Margins = {}));
//# sourceMappingURL=margins.js.map