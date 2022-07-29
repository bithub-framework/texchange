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
let UserMarketFacade = class UserMarketFacade extends events_1.EventEmitter {
    constructor(context, marketSpec, useCaseSubscription, config) {
        super();
        this.context = context;
        this.marketSpec = marketSpec;
        this.useCaseSubscription = useCaseSubscription;
        this.config = config;
        this.PRICE_SCALE = this.marketSpec.PRICE_SCALE;
        this.QUANTITY_SCALE = this.marketSpec.QUANTITY_SCALE;
        this.CURRENCY_SCALE = this.marketSpec.CURRENCY_SCALE;
        this.TICK_SIZE = this.marketSpec.TICK_SIZE;
        this.MARKET_NAME = this.marketSpec.MARKET_NAME;
        this.useCaseSubscription.on('orderbook', async (orderbook) => {
            try {
                await this.context.timeline.sleep(this.config.processing);
                await this.context.timeline.sleep(this.config.ping);
                this.emit('orderbook', this.context.DataTypes.orderbookFactory.copy(orderbook));
            }
            catch (err) { }
        });
        this.useCaseSubscription.on('trades', async (trades) => {
            try {
                await this.context.timeline.sleep(this.config.processing);
                await this.context.timeline.sleep(this.config.ping);
                this.emit('trades', trades.map(trade => this.context.DataTypes.tradeFactory.copy(trade)));
            }
            catch (err) { }
        });
        this.useCaseSubscription.on('error', async (err) => {
            try {
                await this.context.timeline.sleep(this.config.processing);
                await this.context.timeline.sleep(this.config.ping);
                this.emit('error', err);
            }
            catch (err) { }
        });
    }
    quantity(price, dollarVolume) {
        return this.marketSpec.quantity(price, dollarVolume);
    }
    ;
    dollarVolume(price, quantity) {
        return this.marketSpec.dollarVolume(price, quantity);
    }
};
UserMarketFacade = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.subscription)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.FACADES.config))
], UserMarketFacade);
exports.UserMarketFacade = UserMarketFacade;
//# sourceMappingURL=user-market.js.map