"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
const interfaces_1 = require("interfaces");
class Joystick {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
        this.TradeId = new interfaces_1.TexchangeTradeIdStatic();
        this.Trades = new interfaces_1.TexchangeTradesStatic(this.context.H, this.TradeId);
        this.Orderbook = new interfaces_1.OrderbookStatic(this.context.H);
    }
    updateTrades($trades) {
        this.useCases.updateTrades.updateTrades(this.Trades.copy($trades));
    }
    updateOrderbook($orderbook) {
        this.useCases.updateOrderbook.updateOrderbook(this.Orderbook.copy($orderbook));
    }
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map