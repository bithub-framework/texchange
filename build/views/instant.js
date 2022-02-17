"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
const events_1 = require("events");
const interfaces_1 = require("../interfaces");
class Instant extends events_1.EventEmitter {
    constructor(context, scheduler) {
        super();
        this.context = context;
        this.scheduler = scheduler;
        this.initializePushingTrades();
        this.initializePushingOrderbook();
    }
    initializePushingTrades() {
        this.scheduler.on('pushTrades', trades => {
            this.emit('trades', trades.map(trade => ({
                id: trade.id,
                price: trade.price,
                quantity: trade.quantity,
                side: trade.side,
                time: trade.time,
            })));
        });
    }
    initializePushingOrderbook() {
        this.scheduler.on('pushOrderbook', orderbook => {
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
        });
    }
    makeOrders(orders) {
        return orders.map(order => {
            try {
                return this.scheduler.makeOrder(order);
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => this.scheduler.cancelOrder(order));
    }
    amendOrders(amendments) {
        return amendments.map(amendment => {
            try {
                return this.scheduler.amendOrder(amendment);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return this.scheduler.getOpenOrders();
    }
    getPositions() {
        return this.scheduler.getPositions();
    }
    getBalances() {
        return this.scheduler.getBalances();
    }
}
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map