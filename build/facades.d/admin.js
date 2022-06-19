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
exports.AdminFacade = void 0;
const startable_1 = require("startable");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let AdminFacade = class AdminFacade {
    constructor(context, marketSpec, accountSpec, models, mtm, useCases) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.models = models;
        this.mtm = mtm;
        this.useCases = useCases;
        this.startable = startable_1.Startable.create(() => this.rawStart(), () => this.rawStop());
        this.start = this.startable.start;
        this.stop = this.startable.stop;
        this.assart = this.startable.assart;
        this.starp = this.startable.starp;
        this.getReadyState = this.startable.getReadyState;
        this.skipStart = this.startable.skipStart;
    }
    getMarketSpec() {
        return this.marketSpec;
    }
    getAccountSpec() {
        return this.accountSpec;
    }
    updateTrades($trades) {
        this.useCases.updateTrades.updateTrades($trades.map(trade => this.context.Data.DatabaseTrade.copy(trade)));
    }
    updateOrderbook($orderbook) {
        this.useCases.updateOrderbook.updateOrderbook(this.context.Data.DatabaseOrderbook.copy($orderbook));
    }
    getLatestDatabaseOrderbookId() {
        return this.useCases.getProgress.getLatestDatabaseOrderbookId();
    }
    getLatestDatabaseTradeId() {
        return this.useCases.getProgress.getLatestDatabaseTradeId();
    }
    quantity(price, dollarVolume) {
        return this.marketSpec.quantity(price, dollarVolume);
    }
    ;
    dollarVolume(price, quantity) {
        return this.marketSpec.dollarVolume(price, quantity);
    }
    async rawStart() {
        if (this.mtm)
            await this.mtm.start(this.stop);
    }
    async rawStop() {
        if (this.mtm)
            await this.mtm.stop();
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
};
AdminFacade = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.models)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.mtm)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.useCases))
], AdminFacade);
exports.AdminFacade = AdminFacade;
//# sourceMappingURL=admin.js.map