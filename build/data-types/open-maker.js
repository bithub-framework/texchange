"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMakerFactory = void 0;
class OpenMakerFactory {
    constructor(hFactory, frozenFactory, openOrderFactory) {
        this.hFactory = hFactory;
        this.frozenFactory = frozenFactory;
        this.openOrderFactory = openOrderFactory;
    }
    capture(order) {
        return {
            ...this.openOrderFactory.capture(order),
            behind: this.hFactory.capture(order.behind),
            frozen: this.frozenFactory.capture(order.frozen),
        };
    }
    restore(snapshot) {
        return {
            ...this.openOrderFactory.restore(snapshot),
            behind: this.hFactory.restore(snapshot.behind),
            frozen: this.frozenFactory.restore(snapshot.frozen),
        };
    }
    copy(order) {
        return {
            ...this.openOrderFactory.copy(order),
            behind: order.behind,
            frozen: order.frozen,
        };
    }
}
exports.OpenMakerFactory = OpenMakerFactory;
//# sourceMappingURL=open-maker.js.map