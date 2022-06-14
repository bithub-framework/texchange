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
exports.UserMarketFacade = void 0;
const events_1 = require("events");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UserMarketFacade = class UserMarketFacade {
    constructor(context, useCases, config) {
        this.context = context;
        this.useCases = useCases;
        this.config = config;
        this.events = new events_1.EventEmitter();
        this.spec = this.context.spec.market;
        this.useCases.subscription.on('orderbook', async (orderbook) => {
            try {
                await this.context.timeline.sleep(this.config.processing);
                await this.context.timeline.sleep(this.config.ping);
                this.events.emit('orderbook', this.context.Data.Orderbook.copy(orderbook));
            }
            catch (err) { }
        });
        this.useCases.subscription.on('trades', async (trades) => {
            try {
                await this.context.timeline.sleep(this.config.processing);
                await this.context.timeline.sleep(this.config.ping);
                this.events.emit('trades', trades.map(trade => this.context.Data.Trade.copy(trade)));
            }
            catch (err) { }
        });
    }
    quantity(price, dollarVolume) {
        return this.context.calc.quantity(price, dollarVolume);
    }
    ;
    dollarVolume(price, quantity) {
        return this.context.calc.dollarVolume(price, quantity);
    }
};
UserMarketFacade = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.UseCases)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.FACADES.Config))
], UserMarketFacade);
exports.UserMarketFacade = UserMarketFacade;
//# sourceMappingURL=user-market.js.map