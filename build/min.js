"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = void 0;
function min(...a) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
exports.min = min;
//# sourceMappingURL=min.js.map