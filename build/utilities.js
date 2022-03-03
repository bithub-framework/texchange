"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = exports.min = void 0;
function min(x, y) {
    return x.lt(y) ? x : y;
}
exports.min = min;
function max(x, y) {
    return x.gt(y) ? x : y;
}
exports.max = max;
//# sourceMappingURL=utilities.js.map