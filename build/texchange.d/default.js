"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTexchange = void 0;
const texchange_1 = require("../texchange");
const startable_1 = require("startable");
const default_1 = require("../mark-to-market.d/default");
const assets_1 = require("../models.d/assets");
const default_2 = require("../models.d/margin.d/default");
const default_3 = require("../models.d/makers.d/default");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
const default_4 = require("../models.d/pricing.d/default");
const broadcast_1 = require("../broadcast");
const tasks_1 = require("../tasks");
const amend_order_1 = require("../use-cases.d/amend-order");
const cancel_order_1 = require("../use-cases.d/cancel-order");
const get_balances_1 = require("../use-cases.d/get-balances");
const get_open_orders_1 = require("../use-cases.d/get-open-orders");
const get_positions_1 = require("../use-cases.d/get-positions");
const make_order_1 = require("../use-cases.d/make-order");
const update_orderbook_1 = require("../use-cases.d/update-orderbook");
const update_trades_1 = require("../use-cases.d/update-trades");
const views_1 = require("../views");
const big_js_1 = require("big.js");
class DefaultTexchange extends texchange_1.Texchange {
    constructor(config, timeline) {
        super();
        this.context = {
            config,
            timeline,
        };
        this.models = {
            assets: new assets_1.Assets(this.context),
            margin: new default_2.DefaultMargin(this.context),
            makers: new default_3.DefaultMakers(this.context),
            book: new book_1.Book(this.context),
            pricing: new default_4.DefaultPricing(this.context, new big_js_1.default(0)),
            progress: new progress_1.Progress(this.context),
        };
        this.broadcast = new broadcast_1.Broadcast();
        this.tasks = new tasks_1.DefaultTasks(this.context, this.models, this.broadcast);
        this.mtm = new default_1.DefaultMtm(this.context, this.models, this.tasks);
        this.useCases = {
            amendOrder: new amend_order_1.AmendOrder(this.context, this.models, this.broadcast, this.tasks),
            cancelOrder: new cancel_order_1.CancelOrder(this.context, this.models, this.broadcast, this.tasks),
            getBalances: new get_balances_1.GetBalances(this.context, this.models, this.broadcast, this.tasks),
            getOpenOrders: new get_open_orders_1.GetOpenOrders(this.context, this.models, this.broadcast, this.tasks),
            getPositions: new get_positions_1.GetPositions(this.context, this.models, this.broadcast, this.tasks),
            makeOrder: new make_order_1.MakeOrder(this.context, this.models, this.broadcast, this.tasks),
            updateOrderbook: new update_orderbook_1.UpdateOrderbook(this.context, this.models, this.broadcast, this.tasks),
            updateTrades: new update_trades_1.UpdateTrades(this.context, this.models, this.broadcast, this.tasks, this.mtm === null),
        };
        this.views = new views_1.Views(this.context, this.useCases);
        this.startable = new startable_1.StatefulStartable(() => this.start(), () => this.stop(), () => this.capture(), snapshot => this.restore(snapshot));
    }
    capture() {
        return {
            assets: this.models.assets.capture(),
            margin: this.models.margin.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            pricing: this.models.pricing.capture(),
            progress: this.models.progress.capture(),
        };
    }
    restore(snapshot) {
        this.models.assets.restore(snapshot.assets);
        this.models.margin.restore(snapshot.margin);
        this.models.makers.restore(snapshot.makers);
        this.models.book.restore(snapshot.book);
        this.models.pricing.restore(snapshot.pricing);
        this.models.progress.restore(snapshot.progress);
    }
    async start() {
        if (this.mtm)
            await this.mtm.startable.start(this.startable.stop);
    }
    async stop() {
        if (this.mtm)
            await this.mtm.startable.stop();
    }
}
exports.DefaultTexchange = DefaultTexchange;
//# sourceMappingURL=default.js.map