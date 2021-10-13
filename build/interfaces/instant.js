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
        this.emit('trades', trades.map(trade => ({
            id: trade.id,
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
        })));
    }
    pushOrderbook() {
        const orderbook = this.core.states.orderbook.getBook();
        this.emit('orderbook', {
            [interfaces_1.Side.ASK]: orderbook[interfaces_1.Side.ASK].map(order => ({
                price: order.price,
                quantity: order.quantity,
                side: order.side,
            })),
            [interfaces_1.Side.BID]: orderbook[interfaces_1.Side.BID].map(order => ({
                price: order.price,
                quantity: order.quantity,
                side: order.side,
            })),
            time: orderbook.time,
        });
    }
    pushPositionsAndBalances() {
        this.emit('positions', this.getPositions());
        this.emit('balances', this.getBalances());
    }
    makeOrders(orders) {
        return orders.map((order) => {
            try {
                const openOrder = {
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                    length: order.length,
                    operation: order.operation,
                    id: ++this.core.states.misc.userOrderCount,
                    filled: new big_js_1.default(0),
                    unfilled: order.quantity,
                };
                this.core.validation.validateOrder(openOrder);
                const returnedOrder = this.core.ordering.makeOpenOrder(openOrder);
                return {
                    price: returnedOrder.price,
                    quantity: returnedOrder.quantity,
                    side: returnedOrder.side,
                    length: returnedOrder.length,
                    operation: returnedOrder.operation,
                    id: returnedOrder.id,
                    filled: returnedOrder.filled,
                    unfilled: returnedOrder.unfilled,
                };
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => {
            const returnedOrder = this.core.ordering.cancelOpenOrder(order);
            return {
                price: returnedOrder.price,
                quantity: returnedOrder.quantity,
                side: returnedOrder.side,
                length: returnedOrder.length,
                operation: returnedOrder.operation,
                id: returnedOrder.id,
                filled: returnedOrder.filled,
                unfilled: returnedOrder.unfilled,
            };
        });
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
                const returnedOrder = this.core.ordering.makeOpenOrder(openOrder);
                return {
                    price: returnedOrder.price,
                    quantity: returnedOrder.quantity,
                    side: returnedOrder.side,
                    length: returnedOrder.length,
                    operation: returnedOrder.operation,
                    id: returnedOrder.id,
                    filled: returnedOrder.filled,
                    unfilled: returnedOrder.unfilled,
                };
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        const openOrders = [...this.core.states.makers.values()];
        return openOrders.map(order => ({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled: order.filled,
            unfilled: order.unfilled,
        }));
    }
    getPositions() {
        return {
            position: {
                [interfaces_1.Length.LONG]: this.core.states.assets.position[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.core.states.assets.position[interfaces_1.Length.SHORT],
            },
            closable: {
                [interfaces_1.Length.LONG]: this.core.states.margin.closable[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.core.states.margin.closable[interfaces_1.Length.SHORT],
            },
            time: this.core.timeline.now(),
        };
    }
    getBalances() {
        return {
            balance: this.core.states.assets.balance,
            available: this.core.states.margin.available,
            time: this.core.timeline.now(),
        };
    }
}
exports.InterfaceInstant = InterfaceInstant;
//# sourceMappingURL=instant.js.map