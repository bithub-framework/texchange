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
exports.Texchange = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("./injection/types");
let Texchange = class Texchange {
    constructor(admin, userMarket, userAccount) {
        this.admin = admin;
        this.userMarket = userMarket;
        this.userAccount = userAccount;
    }
    getUserMarketFacade() {
        return this.userMarket;
    }
    getUserAccountFacade() {
        return this.userAccount;
    }
    getAdminFacade() {
        return this.admin;
    }
};
Texchange = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.FACADES.admin)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.FACADES.userMarket)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.FACADES.userAccount))
], Texchange);
exports.Texchange = Texchange;
//# sourceMappingURL=texchange.js.map