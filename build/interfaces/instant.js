"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceInstant = void 0;
const events_1 = require("events");
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class InterfaceInstant extends events_1.EventEmitter {
    constructor(core) {
        super();
        this.core = core;
    }
    pushTrades(trades) {
        this.emit('trades', interfaces_1.clone(trades));
    }
    pushOrderbook() {
        this.emit('orderbook', interfaces_1.clone(this.core.states.orderbook.getBook()));
    }
    pushPositionsAndBalances() {
        // this.clearingController.clear();
        const positions = {
            position: this.core.states.assets.position,
            closable: this.core.states.margin.closable,
            time: this.core.timeline.now(),
        };
        const balances = {
            balance: this.core.states.assets.balance,
            available: this.core.states.margin.available,
            time: this.core.timeline.now(),
        };
        this.emit('positions', interfaces_1.clone(positions));
        this.emit('balances', interfaces_1.clone(balances));
    }
    makeOrders(orders) {
        return orders.map((order) => {
            try {
                const openOrder = {
                    ...order,
                    id: ++this.core.states.misc.userOrderCount,
                    filled: new big_js_1.default(0),
                    unfilled: order.quantity,
                };
                this.core.validation.validateOrder(openOrder);
                return interfaces_1.clone(this.core.ordering.makeOpenOrder(openOrder));
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => interfaces_1.clone(this.core.ordering.cancelOpenOrder(order)));
    }
    amendOrders(amendments) {
        return amendments.map((amendment) => {
            try {
                const { filled } = this.core.ordering.cancelOpenOrder(amendment);
                const openOrder = {
                    price: amendment.newPrice,
                    unfilled: amendment.newUnfilled,
                    quantity: amendment.newUnfilled.plus(filled),
                    filled,
                    id: amendment.id,
                    side: amendment.side,
                    length: amendment.length,
                    operation: amendment.operation,
                };
                this.core.validation.validateOrder(openOrder);
                return interfaces_1.clone(this.core.ordering.makeOpenOrder(openOrder));
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return interfaces_1.clone([...this.core.states.makers.values()]);
    }
    getPositions() {
        this.core.clearing.settle();
        const positions = {
            position: this.core.states.assets.position,
            closable: this.core.states.margin.closable,
            time: this.core.timeline.now(),
        };
        return interfaces_1.clone(positions);
    }
    getBalances() {
        this.core.clearing.settle();
        const balances = {
            balance: this.core.states.assets.balance,
            available: this.core.states.margin.available,
            time: this.core.timeline.now(),
        };
        return interfaces_1.clone(balances);
    }
}
exports.InterfaceInstant = InterfaceInstant;
//# sourceMappingURL=instant.js.map