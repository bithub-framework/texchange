"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginManager = void 0;
class MarginManager {
    incPositionMargin(increment) {
        this.positionMargin = this.positionMargin.plus(increment);
    }
    decPositionMargin(decrement) {
        this.positionMargin = this.positionMargin.minus(decrement);
    }
    setPositionMargin(positionMargin) {
        this.positionMargin = positionMargin;
    }
}
exports.MarginManager = MarginManager;
//# sourceMappingURL=1-position-margin-manager.js.map