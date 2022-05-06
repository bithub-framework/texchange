"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margins = void 0;
const secretary_like_1 = require("secretary-like");
class Margins {
    constructor(context) {
        this.context = context;
        this.Margin = new Margins.MarginStatic(this.context.Data.H);
        this.$margin = {
            [secretary_like_1.Length.LONG]: new this.context.Data.H(0),
            [secretary_like_1.Length.SHORT]: new this.context.Data.H(0),
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
                [secretary_like_1.Length.LONG]: this.H.capture(margin[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.capture(margin[secretary_like_1.Length.SHORT]),
            };
        }
        restore(snapshot) {
            return {
                [secretary_like_1.Length.LONG]: this.H.restore(snapshot[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.restore(snapshot[secretary_like_1.Length.SHORT]),
            };
        }
        copy(margin) {
            return {
                [secretary_like_1.Length.LONG]: margin[secretary_like_1.Length.LONG],
                [secretary_like_1.Length.SHORT]: margin[secretary_like_1.Length.SHORT],
            };
        }
    }
    Margins.MarginStatic = MarginStatic;
})(Margins = exports.Margins || (exports.Margins = {}));
//# sourceMappingURL=margins.js.map