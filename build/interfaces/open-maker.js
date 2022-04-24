"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMakerStatic = void 0;
const open_order_1 = require("./open-order");
class OpenMakerStatic {
    constructor(H, OrderId, Frozen) {
        this.H = H;
        this.OrderId = OrderId;
        this.Frozen = Frozen;
        this.OpenOrder = new open_order_1.OpenOrderStatic(this.H, this.OrderId);
    }
    capture(order) {
        return {
            ...this.OpenOrder.capture(order),
            behind: this.H.capture(order.behind),
            frozen: this.Frozen.capture(order.frozen),
        };
    }
    restore(snapshot) {
        return {
            ...this.OpenOrder.restore(snapshot),
            behind: this.H.restore(snapshot.behind),
            frozen: this.Frozen.restore(snapshot.frozen),
        };
    }
    copy(order) {
        return {
            ...this.OpenOrder.copy(order),
            behind: order.behind,
            frozen: order.frozen,
        };
    }
}
exports.OpenMakerStatic = OpenMakerStatic;
//# sourceMappingURL=open-maker.js.map