"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTradeFactory = void 0;
class DatabaseTrade {
    constructor(source, factory) {
        this.factory = factory;
        ({
            side: this.side,
            price: this.price,
            quantity: this.quantity,
            time: this.time,
            id: this.id,
        } = source);
    }
    toJSON() {
        return this.factory.capture(this);
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
class DatabaseTradeFactory {
    constructor(hFactory, tradeFactory) {
        this.hFactory = hFactory;
        this.tradeFactory = tradeFactory;
    }
    new(source) {
        return new DatabaseTrade(source, this);
    }
    capture(trade) {
        return {
            ...this.tradeFactory.capture(trade),
            id: trade.id,
        };
    }
    restore(snapshot) {
        return this.new({
            ...this.tradeFactory.restore(snapshot),
            id: snapshot.id,
        });
    }
}
exports.DatabaseTradeFactory = DatabaseTradeFactory;
//# sourceMappingURL=database-trade.js.map