"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Making = void 0;
const big_js_1 = require("big.js");
class Making {
    constructor(context, models, stages) {
        this.context = context;
        this.models = models;
        this.stages = stages;
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
        const makers = this.models.book.getBook()[openOrder.side];
        for (const maker of makers)
            if (maker.price.eq(openOrder.price))
                // TODO addBehind()
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.models.makers.appendOrder(openMaker);
        this.stages.makers = true;
        this.stages.book = true;
    }
}
exports.Making = Making;
Making.involved = ['book', 'makers'];
//# sourceMappingURL=making.js.map