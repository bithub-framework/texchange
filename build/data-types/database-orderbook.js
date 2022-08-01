"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookFactory = void 0;
const secretary_like_1 = require("secretary-like");
class ConcreteDatabaseOrderbook {
    constructor(source, factory, bookOrderFactory) {
        this.factory = factory;
        for (const side of [secretary_like_1.Side.BID, secretary_like_1.Side.ASK])
            this[side] = source[side].map(order => bookOrderFactory.create(order));
        this.time = source.time;
        this.id = source.id;
    }
    toJSON() {
        return this.factory.capture(this);
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
class DatabaseOrderbookFactory {
    constructor(bookOrderFactory, orderbookFactory) {
        this.bookOrderFactory = bookOrderFactory;
        this.orderbookFactory = orderbookFactory;
    }
    create(source) {
        return new ConcreteDatabaseOrderbook(source, this, this.bookOrderFactory);
    }
    capture(databaseOrderbook) {
        return {
            ...this.orderbookFactory.capture(databaseOrderbook),
            id: databaseOrderbook.id,
        };
    }
    restore(snapshot) {
        return this.create({
            ...this.orderbookFactory.restore(snapshot),
            id: snapshot.id,
        });
    }
}
exports.DatabaseOrderbookFactory = DatabaseOrderbookFactory;
//# sourceMappingURL=database-orderbook.js.map