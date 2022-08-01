"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMakerFactory = void 0;
class ConcreteOpenMaker {
    constructor(source, factory, hFactory, frozenFactory) {
        this.factory = factory;
        ({
            side: this.side,
            length: this.length,
            action: this.action,
            filled: this.filled,
            unfilled: this.unfilled,
            id: this.id,
            behind: this.behind,
        } = source);
        this.price = hFactory.from(source.price);
        this.quantity = hFactory.from(source.quantity);
        this.frozen = frozenFactory.create(source.frozen);
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
    create(source) {
        return new ConcreteOpenMaker(source, this, this.hFactory, this.frozenFactory);
    }
    capture(order) {
        return {
            ...this.openOrderFactory.capture(order),
            behind: this.hFactory.capture(order.behind),
            frozen: this.frozenFactory.capture(order.frozen),
        };
    }
    restore(snapshot) {
        return this.create({
            ...this.openOrderFactory.restore(snapshot),
            behind: this.hFactory.restore(snapshot.behind),
            frozen: this.frozenFactory.restore(snapshot.frozen),
        });
    }
}
exports.OpenMakerFactory = OpenMakerFactory;
//# sourceMappingURL=open-maker.js.map