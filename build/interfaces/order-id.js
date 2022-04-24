"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderIdStatic = exports.OrderId = void 0;
var OrderId;
(function (OrderId) {
})(OrderId = exports.OrderId || (exports.OrderId = {}));
class OrderIdStatic {
    capture(id) {
        return id;
    }
    restore(snapshot) {
        return snapshot;
    }
}
exports.OrderIdStatic = OrderIdStatic;
//# sourceMappingURL=order-id.js.map