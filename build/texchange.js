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
const startable_1 = require("startable");
const injektor_1 = require("injektor");
const models_1 = require("./models");
// Mark to market
const mtm_1 = require("./mark-to-market/mtm");
let Texchange = class Texchange {
    constructor(models, mtm, user, admin) {
        this.models = models;
        this.mtm = mtm;
        this.user = user;
        this.admin = admin;
        this.startable = startable_1.Startable.create(() => this.start(), () => this.stop());
    }
    async start() {
        if (this.mtm)
            await this.mtm.startable.start(this.startable.stop);
    }
    async stop() {
        if (this.mtm)
            await this.mtm.startable.stop();
    }
    capture() {
        return {
            assets: this.models.assets.capture(),
            margins: this.models.margins.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            pricing: this.models.pricing.capture(),
            progress: this.models.progress.capture(),
        };
    }
    restore(snapshot) {
        this.models.assets.restore(snapshot.assets);
        this.models.margins.restore(snapshot.margins);
        this.models.makers.restore(snapshot.makers);
        this.models.book.restore(snapshot.book);
        this.models.pricing.restore(snapshot.pricing);
        this.models.progress.restore(snapshot.progress);
    }
};
Texchange = __decorate([
    __param(0, (0, injektor_1.inject)(models_1.Models)),
    __param(1, (0, injektor_1.inject)(mtm_1.Mtm)),
    __param(2, (0, injektor_1.inject)(4 /* User */)),
    __param(3, (0, injektor_1.inject)(5 /* Admin */))
], Texchange);
exports.Texchange = Texchange;
//# sourceMappingURL=texchange.js.map