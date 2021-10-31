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
        const { orderbook } = this.core.states;
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
    makeOrders(orders) {
        return orders.map(order => this.makeOpenOrder({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: ++this.core.states.misc.userOrderCount,
            filled: new big_js_1.default(0),
            unfilled: order.quantity,
        }));
    }
    /**
     * @returns As duplicate.
     */
    makeOpenOrder(order) {
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
            const trades = this.core.taking.orderTakes(openOrder);
            this.core.making.orderMakes(openOrder);
            if (trades.length) {
                this.core.interfaces.instant.pushTrades(trades);
                this.core.interfaces.instant.pushOrderbook();
                this.core.interfaces.instant.pushBalances();
                this.core.interfaces.instant.pushPositions();
            }
            return openOrder;
        }
        catch (err) {
            return err;
        }
    }
    cancelOrders(orders) {
        return orders.map(order => this.cancelOpenOrder(order));
    }
    /**
     * @returns As duplicate.
     */
    cancelOpenOrder(order) {
        const { makers } = this.core.states;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.removeOrder(order.id);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
    amendOrders(amendments) {
        return amendments.map(amendment => {
            const oldOrder = this.cancelOpenOrder(amendment);
            const newOrder = {
                price: amendment.newPrice,
                filled: oldOrder.filled,
                unfilled: amendment.newUnfilled,
                quantity: amendment.newUnfilled.plus(oldOrder.filled),
                id: amendment.id,
                side: amendment.side,
                length: amendment.length,
                operation: amendment.operation,
            };
            return this.makeOpenOrder(newOrder);
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
            closable: this.getClosable(),
            time: this.core.timeline.now(),
        };
    }
    getBalances() {
        return {
            balance: this.core.states.assets.balance,
            available: this.getAvailable(),
            time: this.core.timeline.now(),
        };
    }
    pushBalances() {
        this.emit('balances', this.getBalances());
    }
    pushPositions() {
        this.emit('positions', this.getPositions());
    }
    getAvailable() {
        return this.core.states.assets.balance
            .minus(this.core.calculation.finalMargin())
            .minus(this.core.calculation.finalFrozenBalance());
    }
    getClosable() {
        const { assets, makers } = this.core.states;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(makers.frozenSum.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(makers.frozenSum.position[interfaces_1.Length.SHORT]),
        };
    }
}
exports.InterfaceInstant = InterfaceInstant;
//# sourceMappingURL=instant.js.map