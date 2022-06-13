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
exports.UpdateOrderbook = void 0;
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let UpdateOrderbook = class UpdateOrderbook {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.context.timeline.now());
        this.models.book.setBasebook(orderbook);
        this.models.progress.updateDatabaseOrderbook(orderbook);
        this.broadcast.emit('orderbook', this.models.book.getBook());
    }
};
UpdateOrderbook = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.Tasks))
], UpdateOrderbook);
exports.UpdateOrderbook = UpdateOrderbook;
//# sourceMappingURL=update-orderbook.js.map