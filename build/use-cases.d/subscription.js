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
exports.UseCaseSubscription = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
const events_1 = require("events");
let UseCaseSubscription = class UseCaseSubscription extends events_1.EventEmitter {
    constructor(broadcast) {
        super();
        this.broadcast = broadcast;
        this.broadcast.on('balances', balances => this.emit('balances', balances));
        this.broadcast.on('positions', positions => this.emit('positions', positions));
        this.broadcast.on('trades', trades => this.emit('trades', trades));
        this.broadcast.on('orderbook', orderbook => this.emit('orderbook', orderbook));
    }
};
UseCaseSubscription = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.MIDDLEWARES.broadcast))
], UseCaseSubscription);
exports.UseCaseSubscription = UseCaseSubscription;
//# sourceMappingURL=subscription.js.map