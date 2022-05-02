"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
class Joystick {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
        this.Data = this.context.Data;
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
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map