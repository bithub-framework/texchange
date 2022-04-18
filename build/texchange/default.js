"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTexchange = void 0;
const texchange_1 = require("./texchange");
const default_1 = require("../context.d/market-calc/default");
// Models
const assets_1 = require("../models.d/assets");
const default_2 = require("../models.d/makers/default");
const margins_1 = require("../models.d/margins");
const book_1 = require("../models.d/book");
const progress_1 = require("../models.d/progress");
const default_3 = require("../models.d/pricing/default");
const events_1 = require("events");
const make_open_order_1 = require("../tasks.d/make-open-order/make-open-order");
const cancel_open_order_1 = require("../tasks.d/cancel-open-order/cancel-open-order");
const get_balances_1 = require("../tasks.d/get-balances/get-balances");
const get_closable_1 = require("../tasks.d/get-closable/get-closable");
const get_positions_1 = require("../tasks.d/get-positions/get-positions");
const order_makes_1 = require("../tasks.d/order-makes/order-makes");
const order_takes_1 = require("../tasks.d/order-takes/order-takes");
const trade_takes_open_makers_1 = require("../tasks.d/trade-takes-open-makers/trade-takes-open-makers");
const validate_order_1 = require("../tasks.d/validate-order/validate-order");
const order_volumes_1 = require("../tasks.d/order-volumes/order-volumes");
const default_4 = require("../tasks.d/get-available/default");
const default_5 = require("../tasks.d/settle/default");
const default_6 = require("../tasks.d/margin-accumulation/default");
const injektor_1 = require("injektor");
const default_7 = require("../mark-to-market/default");
const make_order_1 = require("../use-cases.d/make-order");
const cancel_order_1 = require("../use-cases.d/cancel-order");
const amend_order_1 = require("../use-cases.d/amend-order");
const get_open_orders_1 = require("../use-cases.d/get-open-orders");
const get_positions_2 = require("../use-cases.d/get-positions");
const get_balances_2 = require("../use-cases.d/get-balances");
const update_orderbook_1 = require("../use-cases.d/update-orderbook");
const update_trades_1 = require("../use-cases.d/update-trades");
const subscription_1 = require("../use-cases.d/subscription");
const instant_1 = require("../views.d/instant");
const latency_1 = require("../views.d/latency");
const joystick_1 = require("../views.d/joystick");
class DefaultTexchange extends texchange_1.Texchange {
    constructor(config, timeline, H) {
        super();
        this.context = this.assembleContext(config, timeline, H);
        this.models = this.assembleModels();
        this.broadcast = new events_1.EventEmitter();
        ;
        this.tasks = this.assembleTasks();
        this.mtm = new default_7.DefaultMtm(this.context, this.models, this.broadcast, this.tasks);
        this.useCases = this.assembleUseCases();
        this.views = this.assembleViews();
        this.user = this.views.latency;
        this.admin = this.views.joystick;
    }
    assembleContext(config, timeline, H) {
        return {
            config,
            timeline,
            H,
            calc: new default_1.DefaultMarketCalc(),
        };
    }
    assembleModels() {
        return {
            assets: new assets_1.Assets(this.context),
            margins: new margins_1.Margins(this.context),
            book: new book_1.Book(this.context),
            progress: new progress_1.Progress(this.context),
            makers: new default_2.DefaultMakers(this.context),
            pricing: new default_3.DefaultPricing(this.context),
        };
    }
    assembleTasks() {
        const container = new injektor_1.Container();
        const tasks = {
            cancelOpenOrder: new cancel_open_order_1.CancelOpenOrder(this.context, this.models, this.broadcast),
            getBalances: new get_balances_1.GetBalances(this.context, this.models, this.broadcast),
            getClosable: new get_closable_1.GetClosable(this.context, this.models, this.broadcast),
            getPositions: new get_positions_1.GetPositions(this.context, this.models, this.broadcast),
            makeOpenOrder: new make_open_order_1.MakeOpenOrder(this.context, this.models, this.broadcast),
            orderMakes: new order_makes_1.OrderMakes(this.context, this.models, this.broadcast),
            orderTakes: new order_takes_1.OrderTakes(this.context, this.models, this.broadcast),
            tradeTakesOpenMakers: new trade_takes_open_makers_1.TradeTakesOpenMakers(this.context, this.models, this.broadcast),
            validateOrder: new validate_order_1.ValidateOrder(this.context, this.models, this.broadcast),
            orderVolumes: new order_volumes_1.OrderVolumes(this.context, this.models, this.broadcast),
            getAvailable: new default_4.DefaultGetAvailable(this.context, this.models, this.broadcast),
            settle: new default_5.DefaultSettle(this.context, this.models, this.broadcast),
            marginAccumulation: new default_6.DefaultMarginAccumulation(this.context, this.models, this.broadcast),
        };
        container.register(cancel_open_order_1.CancelOpenOrder.TaskDeps, () => tasks);
        container.register(default_4.DefaultGetAvailable.TaskDeps, () => tasks);
        container.register(get_balances_1.GetBalances.TaskDeps, () => tasks);
        container.register(get_closable_1.GetClosable.TaskDeps, () => tasks);
        container.register(get_positions_1.GetPositions.TaskDeps, () => tasks);
        container.register(make_open_order_1.MakeOpenOrder.TaskDeps, () => tasks);
        container.register(default_6.DefaultMarginAccumulation.TaskDeps, () => tasks);
        container.register(order_makes_1.OrderMakes.TaskDeps, () => tasks);
        container.register(order_takes_1.OrderTakes.TaskDeps, () => tasks);
        container.register(order_volumes_1.OrderVolumes.TaskDeps, () => tasks);
        container.register(default_5.DefaultSettle.TaskDeps, () => tasks);
        container.register(trade_takes_open_makers_1.TradeTakesOpenMakers.TaskDeps, () => tasks);
        container.register(validate_order_1.ValidateOrder.TaskDeps, () => tasks);
        container.inject(tasks.cancelOpenOrder);
        container.inject(tasks.getAvailable);
        container.inject(tasks.getBalances);
        container.inject(tasks.getClosable);
        container.inject(tasks.getPositions);
        container.inject(tasks.makeOpenOrder);
        container.inject(tasks.marginAccumulation);
        container.inject(tasks.orderMakes);
        container.inject(tasks.orderTakes);
        container.inject(tasks.orderVolumes);
        container.inject(tasks.settle);
        container.inject(tasks.tradeTakesOpenMakers);
        container.inject(tasks.validateOrder);
        return tasks;
    }
    assembleUseCases() {
        return {
            amendOrder: new amend_order_1.AmendOrder(this.context, this.models, this.broadcast, this.tasks),
            cancelOrder: new cancel_order_1.CancelOrder(this.context, this.models, this.broadcast, this.tasks),
            getBalances: new get_balances_2.GetBalances(this.context, this.models, this.broadcast, this.tasks),
            getOpenOrders: new get_open_orders_1.GetOpenOrders(this.context, this.models, this.broadcast, this.tasks),
            getPositions: new get_positions_2.GetPositions(this.context, this.models, this.broadcast, this.tasks),
            makeOrder: new make_order_1.MakeOrder(this.context, this.models, this.broadcast, this.tasks),
            updateOrderbook: new update_orderbook_1.UpdateOrderbook(this.context, this.models, this.broadcast, this.tasks),
            subscription: new subscription_1.Subscription(this.context, this.models, this.broadcast, this.tasks),
            updateTrades: new update_trades_1.UpdateTrades(this.context, this.models, this.broadcast, this.tasks, true),
        };
    }
    assembleViews() {
        const instant = new instant_1.Instant(this.context, this.useCases);
        const latency = new latency_1.Latency(this.context, this.useCases, instant);
        const joystick = new joystick_1.Joystick(this.context, this.useCases);
        return {
            instant,
            latency,
            joystick,
        };
    }
    capture() {
        return {
            assets: this.models.assets.capture(),
            margins: this.models.margins.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            pricing: this.models.pricing.capture(),
            progress: this.models.progress.capture(),
        };
    }
    restore(snapshot) {
        this.models.assets.restore(snapshot.assets);
        this.models.margins.restore(snapshot.margins);
        this.models.makers.restore(snapshot.makers);
        this.models.book.restore(snapshot.book);
        this.models.pricing.restore(snapshot.pricing);
        this.models.progress.restore(snapshot.progress);
    }
}
exports.DefaultTexchange = DefaultTexchange;
//# sourceMappingURL=default.js.map