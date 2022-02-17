"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
class Joystick {
    constructor(context, tasks) {
        this.context = context;
        this.tasks = tasks;
    }
    updateTrades(trades) {
        this.tasks.updateTrades.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        this.tasks.updateOrderbook.updateOrderbook(orderbook);
    }
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map