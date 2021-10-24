"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsMaking = void 0;
const big_js_1 = require("big.js");
class MethodsMaking {
    constructor(core) {
        this.core = core;
    }
    orderMakes(openOrder) {
        const { orderbook, margin, makers } = this.core.states;
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
        for (const maker of orderbook.getOrderbook()[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        const toFreeze = makers.appendOrder(openMaker);
        margin.freeze(toFreeze);
    }
}
exports.MethodsMaking = MethodsMaking;
//# sourceMappingURL=making.js.map