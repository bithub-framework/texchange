"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
class Joystick {
    constructor(context, useCases) {
        this.context = context;
        this.useCases = useCases;
    }
    updateTrades(trades) {
        this.useCases.updateTrades.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        this.useCases.updateOrderbook.updateOrderbook(orderbook);
    }
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map