"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
class Joystick {
    constructor(hub) {
        this.hub = hub;
    }
    /**
     * Make sure update all trades which have same timestamp at a time.
     * @param trades
     */
    updateTrades(trades) {
        this.hub.presenters.updating.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        this.hub.presenters.updating.updateOrderbook(orderbook);
    }
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map