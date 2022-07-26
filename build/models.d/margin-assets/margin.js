"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginStatic = exports.Margin = void 0;
const secretary_like_1 = require("secretary-like");
class Margin {
    constructor(long, short) {
        this.long = long;
        this.short = short;
    }
    get(length) {
        if (length === secretary_like_1.Length.LONG)
            return this.long;
        else
            return this.short;
    }
    set(length, margin) {
        if (length === secretary_like_1.Length.LONG)
            this.long = margin;
        else
            this.short = margin;
    }
}
exports.Margin = Margin;
class MarginStatic {
    constructor(H) {
        this.H = H;
    }
    capture(margin) {
        return {
            long: this.H.capture(margin.get(secretary_like_1.Length.LONG)),
            short: this.H.capture(margin.get(secretary_like_1.Length.SHORT)),
        };
    }
    restore(snapshot) {
        return new Margin(this.H.restore(snapshot.long), this.H.restore(snapshot.short));
    }
    copy(margin) {
        return new Margin(margin.get(secretary_like_1.Length.LONG), margin.get(secretary_like_1.Length.SHORT));
    }
}
exports.MarginStatic = MarginStatic;
//# sourceMappingURL=margin.js.map