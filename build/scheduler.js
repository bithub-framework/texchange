"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const events_1 = require("events");
const mtm_1 = require("./controllers/mtm");
const clearing_1 = require("./controllers/clearing");
const taking_1 = require("./controllers/taking");
const taken_1 = require("./controllers/taken");
const making_1 = require("./controllers/making");
const validation_1 = require("./controllers/validation");
const account_view_1 = require("./controllers/account-view");
const ordering_1 = require("./controllers/ordering");
const updating_1 = require("./controllers/updating");
const interfaces_1 = require("./interfaces");
class Scheduler extends events_1.EventEmitter {
    constructor(context, models) {
        super();
        this.context = context;
        this.models = models;
        this.initialStages = {
            assets: false,
            margin: false,
            makers: false,
            progress: false,
            book: false,
            pricing: false,
        };
        this.stages = { ...this.initialStages };
        this.taking = new taking_1.Taking(context, models, this.stages);
        this.making = new making_1.Making(context, models, this.stages);
        this.taken = new taken_1.Taken(context, models, this.stages);
        this.clearing = new clearing_1.Clearing(context, models, this.stages);
        this.mtm = new mtm_1.DefaultMtm(context, models, this.stages, this.clearing);
        this.accountView = new account_view_1.AccountView(context, models, this.stages);
        this.validation = new validation_1.Validation(context, models, this.stages, this.accountView);
        this.ordering = new ordering_1.Ordering(context, models, this.stages, this.validation, this.taking, this.making);
        this.updating = new updating_1.Updating(context, models, this.stages, this.taken);
        this.updating.on('pushTrades', trades => {
            this.emit('pushTrades', trades);
        });
        this.updating.on('pushOrderbook', () => {
            this.emit('pushOrderbook', models.book.getBook());
        });
        this.ordering.on('pushTrades', trades => {
            this.emit('pushTrades', trades);
        });
        this.ordering.on('pushOrderbook', () => {
            this.emit('pushOrderbook', models.book.getBook());
        });
        this.ordering.on('pushPositions', () => {
            this.emit('pushPositions', {
                position: {
                    [interfaces_1.Length.LONG]: models.assets.position[interfaces_1.Length.LONG],
                    [interfaces_1.Length.SHORT]: models.assets.position[interfaces_1.Length.SHORT],
                },
                closable: this.accountView.getClosable(),
                time: context.timeline.now(),
            });
        });
        this.ordering.on('pushBalances', () => {
            this.emit('pushBalances', {
                balance: models.assets.balance,
                available: this.accountView.getAvailable(),
                time: context.timeline.now(),
            });
        });
    }
    initializeStages(involved) {
        for (const modelName of involved)
            this.stages[modelName] = this.initialStages[modelName];
    }
    makeOrder(order) {
        const involved = [...ordering_1.Ordering.involved];
        this.initializeStages(involved);
        return this.ordering.makeOrder(order);
    }
    cancelOrder(order) {
        const involved = [...ordering_1.Ordering.involved];
        this.initializeStages(involved);
        return this.ordering.cancelOrder(order);
    }
    amendOrder(amendment) {
        const involved = [...ordering_1.Ordering.involved];
        this.initializeStages(involved);
        return this.ordering.amendOrder(amendment);
    }
    getOpenOrders() {
        const openOrders = [...this.models.makers.values()];
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
                [interfaces_1.Length.LONG]: this.models.assets.position[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: this.models.assets.position[interfaces_1.Length.SHORT],
            },
            closable: this.accountView.getClosable(),
            time: this.context.timeline.now(),
        };
    }
    getBalances() {
        return {
            balance: this.models.assets.balance,
            available: this.accountView.getAvailable(),
            time: this.context.timeline.now(),
        };
    }
    updateTrades(trades) {
        const involved = [...updating_1.Updating.involved];
        this.initializeStages(involved);
        this.updating.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        const involved = [...updating_1.Updating.involved];
        this.initializeStages(involved);
        this.updating.updateOrderbook(orderbook);
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map