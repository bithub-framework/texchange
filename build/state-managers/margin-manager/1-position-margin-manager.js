"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarginManager = void 0;
class MarginManager {
    incPositionMargin(length, increment) {
        this.positionMargin[length] = this.positionMargin[length].plus(increment);
    }
    decPositionMargin(length, decrement) {
        this.positionMargin[length] = this.positionMargin[length].minus(decrement);
    }
    setPositionMargin(length, positionMargin) {
        this.positionMargin[length] = positionMargin;
    }
}
exports.MarginManager = MarginManager;
//# sourceMappingURL=1-position-margin-manager.js.map