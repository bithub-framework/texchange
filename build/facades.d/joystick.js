"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
const interfaces_1 = require("../interfaces");
const update_orderbook_1 = require("../use-cases.d/update-orderbook");
const update_trades_1 = require("../use-cases.d/update-trades");
class Joystick {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
        this.TradeId = new interfaces_1.TradeIdStatic();
        this.DatabaseOrderbook = new update_orderbook_1.DatabaseOrderbookStatic(this.context.H);
        this.DatabaseTrades = new update_trades_1.DatabaseTradesStatic(this.context.H, this.TradeId);
        this.config = this.context.config;
    }
    updateTrades($trades) {
        this.useCases.updateTrades.updateTrades(this.DatabaseTrades.copy($trades));
    }
    updateOrderbook($orderbook) {
        this.useCases.updateOrderbook.updateOrderbook(this.DatabaseOrderbook.copy($orderbook));
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