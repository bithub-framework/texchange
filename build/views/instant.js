"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
const events_1 = require("events");
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class Instant extends events_1.EventEmitter {
    constructor(hub) {
        super();
        this.hub = hub;
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
        const orderbook = this.hub.models.book.getBook();
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
        const { validation } = this.hub.presenters;
        return orders.map(order => {
            try {
                const openOrder = {
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                    length: order.length,
                    operation: order.operation,
                    id: ++this.hub.models.progress.userOrderCount,
                    filled: new big_js_1.default(0),
                    unfilled: order.quantity,
                };
                validation.validateOrder(openOrder);
                return this.makeOpenOrder(openOrder);
            }
            catch (err) {
                return err;
            }
        });
    }
    makeOpenOrder(order) {
        const trades = this.hub.presenters.taking.orderTakes(order);
        this.hub.presenters.making.orderMakes(order);
        if (trades.length) {
            this.hub.views.instant.pushTrades(trades);
            this.hub.views.instant.pushOrderbook();
            this.hub.views.instant.pushBalances();
            this.hub.views.instant.pushPositions();
        }
        return order;
    }
    cancelOrders(orders) {
        return orders.map(order => this.cancelOpenOrder(order));
    }
    cancelOpenOrder(order) {
        const { makers } = this.hub.models;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.tryRemoveOrder(order.id);
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
        const { validation } = this.hub.presenters;
        return amendments.map(amendment => {
            const oldOrder = this.cancelOpenOrder(amendment);
            try {
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
                validation.validateOrder(newOrder);
                return this.makeOpenOrder(newOrder);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        const openOrders = [...this.hub.models.makers.values()];
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
                [interfaces_1.Length.LONG]: this.hub.models.assets.position[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.hub.models.assets.position[interfaces_1.Length.SHORT],
            },
            closable: this.getClosable(),
            time: this.hub.context.timeline.now(),
        };
    }
    getBalances() {
        return {
            balance: this.hub.models.assets.balance,
            available: this.getAvailable(),
            time: this.hub.context.timeline.now(),
        };
    }
    pushBalances() {
        this.emit('balances', this.getBalances());
    }
    pushPositions() {
        this.emit('positions', this.getPositions());
    }
    getAvailable() {
        return this.hub.presenters.accountView.getAvailable();
    }
    getClosable() {
        return this.hub.presenters.accountView.getClosable();
    }
}
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map