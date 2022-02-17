"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
class Joystick {
    constructor(context, scheduler) {
        this.context = context;
        this.scheduler = scheduler;
    }
    updateTrades(trades) {
        this.scheduler.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        this.scheduler.updateOrderbook(orderbook);
    }
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map