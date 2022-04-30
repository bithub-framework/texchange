"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStatic = void 0;
const data_1 = require("interfaces/build/secretaries/data/data");
const open_maker_1 = require("./open-maker");
const frozen_1 = require("./frozen");
const database_trade_1 = require("./database-trade");
const database_orderbook_1 = require("./database-orderbook");
class DataStatic extends data_1.DataStatic {
    constructor() {
        super(...arguments);
        this.Frozen = new frozen_1.FrozenStatic(this.H);
        this.OpenMaker = new open_maker_1.OpenMakerStatic(this.H, this.Frozen);
        this.DatabaseOrderbook = new database_orderbook_1.DatabaseOrderbookStatic(this.H);
        this.DatabaseTrade = new database_trade_1.DatabaseTradeStatic(this.H);
    }
}
exports.DataStatic = DataStatic;
//# sourceMappingURL=data.js.map