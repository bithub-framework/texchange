"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginFactory = exports.Margin = void 0;
const secretary_like_1 = require("secretary-like");
class Margin extends secretary_like_1.LengthPair {
}
exports.Margin = Margin;
class MarginFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(margin) {
        return {
            long: this.hFactory.capture(margin.get(secretary_like_1.Length.LONG)),
            short: this.hFactory.capture(margin.get(secretary_like_1.Length.SHORT)),
        };
    }
    restore(snapshot) {
        return new Margin(this.hFactory.restore(snapshot.long), this.hFactory.restore(snapshot.short));
    }
    copy(margin) {
        return new Margin(margin.get(secretary_like_1.Length.LONG), margin.get(secretary_like_1.Length.SHORT));
    }
}
exports.MarginFactory = MarginFactory;
//# sourceMappingURL=margin.js.map