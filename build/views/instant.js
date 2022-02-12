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
        const { orderbooks: orderbook } = this.hub.models;
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
            id: this.hub.models.progress.incUserOrderCount(),
            filled: new big_js_1.default(0),
            unfilled: order.quantity,
        }));
    }
    /**
     * @returns As duplicate.
     */
    makeOpenOrder(order) {
        try {
            this.hub.presenters.validation.validateOrder(order);
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
        const { makers } = this.hub.models;
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
        return this.hub.models.assets.balance
            .minus(this.hub.context.calculation.finalMargin())
            .minus(this.hub.context.calculation.finalFrozenBalance())
            .round(this.hub.context.config.CURRENCY_DP);
    }
    getClosable() {
        const { assets, makers } = this.hub.models;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(makers.totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(makers.totalFrozen.position[interfaces_1.Length.SHORT]),
        };
    }
}
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map