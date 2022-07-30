"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMakerFactory = void 0;
class OpenMaker {
    constructor(source, factory, frozenFactory) {
        this.factory = factory;
        ({
            price: this.price,
            quantity: this.quantity,
            side: this.side,
            length: this.length,
            action: this.action,
            filled: this.filled,
            unfilled: this.unfilled,
            id: this.id,
            behind: this.behind,
        } = source);
        this.frozen = frozenFactory.new(source.frozen);
    }
    toJSON() {
        return this.factory.capture(this);
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
class OpenMakerFactory {
    constructor(hFactory, frozenFactory, openOrderFactory) {
        this.hFactory = hFactory;
        this.frozenFactory = frozenFactory;
        this.openOrderFactory = openOrderFactory;
    }
    new(source) {
        return new OpenMaker(source, this, this.frozenFactory);
    }
    capture(order) {
        return {
            ...this.openOrderFactory.capture(order),
            behind: this.hFactory.capture(order.behind),
            frozen: this.frozenFactory.capture(order.frozen),
        };
    }
    restore(snapshot) {
        return this.new({
            ...this.openOrderFactory.restore(snapshot),
            behind: this.hFactory.restore(snapshot.behind),
            frozen: this.frozenFactory.restore(snapshot.frozen),
        });
    }
}
exports.OpenMakerFactory = OpenMakerFactory;
//# sourceMappingURL=open-maker.js.map