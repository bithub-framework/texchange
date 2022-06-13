"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCases = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UseCases = class UseCases {
    // public makeOrder: MakeOrder<H>;
    // public cancelOrder: CancelOrder<H>;
    // public amendOrder: AmendOrder<H>;
    // public getOpenOrders: GetOpenOrders<H>;
    // public getPositions: GetPositions<H>;
    // public getBalances: GetBalances<H>;
    // public updateOrderbook: UpdateOrderbook<H>;
    // public subscription: Subscription<H>;
    // public getProgress: GetProgress<H>;
    constructor(
    // @inject(TYPES.Context)
    // context: Context<H>,
    // @inject(TYPES.Models)
    // models: Models<H>,
    // @inject(TYPES.Broadcast)
    // broadcast: Broadcast<H>,
    // @inject(TYPES.Tasks)
    // tasks: Tasks<H>,
    makeOrder, cancelOrder, amendOrder, getOpenOrders, getPositions, getBalances, updateOrderbook, subscription, getProgress, updateTrades) {
        this.makeOrder = makeOrder;
        this.cancelOrder = cancelOrder;
        this.amendOrder = amendOrder;
        this.getOpenOrders = getOpenOrders;
        this.getPositions = getPositions;
        this.getBalances = getBalances;
        this.updateOrderbook = updateOrderbook;
        this.subscription = subscription;
        this.getProgress = getProgress;
        this.updateTrades = updateTrades;
        // this.amendOrder = new AmendOrder(context, models, broadcast, tasks);
        // this.cancelOrder = new CancelOrder(context, models, broadcast, tasks);
        // this.getBalances = new GetBalances(context, models, broadcast, tasks);
        // this.getOpenOrders = new GetOpenOrders(context, models, broadcast, tasks);
        // this.getPositions = new GetPositions(context, models, broadcast, tasks);
        // this.makeOrder = new MakeOrder(context, models, broadcast, tasks);
        // this.updateOrderbook = new UpdateOrderbook(context, models, broadcast, tasks);
        // this.subscription = new Subscription(context, models, broadcast, tasks);
        // this.getProgress = new GetProgress(context, models, broadcast, tasks);
    }
};
UseCases = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.MakeOrder)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.CancelOrder)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.AmendOrder)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.GetOpenOrders)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.GetPositions)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.GetBalances)),
    __param(6, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.UpdateOrderbook)),
    __param(7, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.Subscription)),
    __param(8, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.GetProgress)),
    __param(9, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.UpdateTrades))
], UseCases);
exports.UseCases = UseCases;
//# sourceMappingURL=use-cases.js.map