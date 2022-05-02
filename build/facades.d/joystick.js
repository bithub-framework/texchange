"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
const startable_1 = require("startable");
class Joystick {
    constructor(context, models, mtm, useCases) {
        this.context = context;
        this.models = models;
        this.mtm = mtm;
        this.useCases = useCases;
        this.Data = this.context.Data;
        this.startable = new startable_1.Startable(() => this.start(), () => this.stop());
        this.config = this.context.config;
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
        return this.context.calc.quantity(price, dollarVolume);
    }
    ;
    dollarVolume(price, quantity) {
        return this.context.calc.dollarVolume(price, quantity);
    }
    async start() {
        if (this.mtm)
            await this.mtm.startable.start(this.startable.stop);
    }
    async stop() {
        if (this.mtm)
            await this.mtm.startable.stop();
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
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map