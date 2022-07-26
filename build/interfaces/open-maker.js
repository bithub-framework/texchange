"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMakerStatic = void 0;
const secretary_like_1 = require("secretary-like");
class OpenMakerStatic extends secretary_like_1.OpenOrderStatic {
    constructor(H, Frozen) {
        super(H);
        this.Frozen = Frozen;
    }
    capture(order) {
        return {
            ...this.captureOpenOrder(order),
            behind: this.H.capture(order.behind),
            frozen: this.Frozen.capture(order.frozen),
        };
    }
    restore(snapshot) {
        return {
            ...this.restoreOpenOrder(snapshot),
            behind: this.H.restore(snapshot.behind),
            frozen: this.Frozen.restore(snapshot.frozen),
        };
    }
    copy(order) {
        return {
            ...this.copyOpenOrder(order),
            behind: order.behind,
            frozen: order.frozen,
        };
    }
}
exports.OpenMakerStatic = OpenMakerStatic;
//# sourceMappingURL=open-maker.js.map