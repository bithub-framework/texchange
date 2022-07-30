"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypesNamespace = void 0;
const secretary_like_1 = require("secretary-like");
const open_maker_1 = require("../data-types/open-maker");
const frozen_1 = require("../data-types/frozen");
const database_trade_1 = require("../data-types/database-trade");
const database_orderbook_1 = require("../data-types/database-orderbook");
class DataTypesNamespace extends secretary_like_1.DataTypesNamespace {
    constructor() {
        super(...arguments);
        this.frozenFactory = new frozen_1.FrozenFactory(this.hFactory);
        this.Frozen = new frozen_1.FrozenStatic(this.hFactory, this.positionFactory);
        this.openMakerFactory = new open_maker_1.OpenMakerFactory(this.hFactory, this.frozenFactory, this.openOrderFactory);
        this.databaseOrderbookFactory = new database_orderbook_1.DatabaseOrderbookFactory(this.bookOrderFactory, this.orderbookFactory);
        this.databaseTradeFactory = new database_trade_1.DatabaseTradeFactory(this.hFactory, this.tradeFactory);
    }
}
exports.DataTypesNamespace = DataTypesNamespace;
//# sourceMappingURL=data-types-namespace.js.map