"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
const events_1 = require("events");
class Instant extends events_1.EventEmitter {
    constructor(context, useCases) {
        super();
        this.context = context;
        this.useCases = useCases;
        // this.initializePushingTrades();
        // this.initializePushingOrderbook();
    }
    // private initializePushingTrades(): void {
    //     this.tasks.on('pushTrades', trades => {
    //         this.emit('trades', trades.map(trade => ({
    //             id: trade.id,
    //             price: trade.price,
    //             quantity: trade.quantity,
    //             side: trade.side,
    //             time: trade.time,
    //         })));
    //     })
    // }
    // private initializePushingOrderbook(): void {
    //     this.scheduler.on('pushOrderbook', orderbook => {
    //         this.emit('orderbook', {
    //             [Side.ASK]: orderbook[Side.ASK].map(order => ({
    //                 price: order.price,
    //                 quantity: order.quantity,
    //                 side: order.side,
    //             })),
    //             [Side.BID]: orderbook[Side.BID].map(order => ({
    //                 price: order.price,
    //                 quantity: order.quantity,
    //                 side: order.side,
    //             })),
    //             time: orderbook.time,
    //         });
    //     });
    // }
    makeOrders(orders) {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }
    amendOrders(amendments) {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return this.useCases.getOpenOrders.getOpenOrders();
    }
    getPositions() {
        return this.useCases.getPositions.getPositions();
    }
    getBalances() {
        return this.useCases.getBalances.getBalances();
    }
}
exports.Instant = Instant;
//# sourceMappingURL=instant.js.map