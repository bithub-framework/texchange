"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const events_1 = require("events");
class Subscription extends events_1.EventEmitter {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.broadcast.on('balances', balances => this.emit('balances', balances));
        this.broadcast.on('positions', positions => this.emit('positions', positions));
        this.broadcast.on('trades', trades => this.emit('trades', trades));
        this.broadcast.on('orderbook', orderbook => this.emit('orderbook', orderbook));
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.js.map