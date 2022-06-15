"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStatic = void 0;
const secretary_like_1 = require("secretary-like");
const open_maker_1 = require("./open-maker");
const frozen_1 = require("./frozen");
const database_trade_1 = require("./database-trade");
const database_orderbook_1 = require("./database-orderbook");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let DataStatic = class DataStatic extends secretary_like_1.DataStatic {
    constructor(H) {
        super(H);
        this.Frozen = new frozen_1.FrozenStatic(this.H);
        this.OpenMaker = new open_maker_1.OpenMakerStatic(this.H, this.Frozen);
        this.DatabaseOrderbook = new database_orderbook_1.DatabaseOrderbookStatic(this.H);
        this.DatabaseTrade = new database_trade_1.DatabaseTradeStatic(this.H);
    }
};
DataStatic = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.hStatic))
], DataStatic);
exports.DataStatic = DataStatic;
//# sourceMappingURL=data.js.map