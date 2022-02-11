"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Making = void 0;
const big_js_1 = require("big.js");
class Making {
    constructor(core) {
        this.core = core;
    }
    orderMakes(openOrder) {
        const openMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new big_js_1.default(0),
        };
        const makers = this.core.models.orderbooks[openOrder.side];
        for (const maker of makers)
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.core.models.makers.appendOrder(openMaker);
    }
}
exports.Making = Making;
//# sourceMappingURL=making.js.map