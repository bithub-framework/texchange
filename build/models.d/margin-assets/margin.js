"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginFactory = exports.Margin = void 0;
const secretary_like_1 = require("secretary-like");
class Margin {
}
exports.Margin = Margin;
class MarginFactory {
    constructor(hFactory) {
        this.hFactory = hFactory;
    }
    capture(margin) {
        return {
            long: this.hFactory.capture(margin[secretary_like_1.Length.LONG]),
            short: this.hFactory.capture(margin[secretary_like_1.Length.SHORT]),
        };
    }
    restore(snapshot) {
        return {
            [secretary_like_1.Length.LONG]: this.hFactory.restore(snapshot.long),
            [secretary_like_1.Length.SHORT]: this.hFactory.restore(snapshot.short),
        };
    }
    copy(margin) {
        return {
            [secretary_like_1.Length.LONG]: margin[secretary_like_1.Length.LONG],
            [secretary_like_1.Length.SHORT]: margin[secretary_like_1.Length.SHORT],
        };
    }
}
exports.MarginFactory = MarginFactory;
//# sourceMappingURL=margin.js.map