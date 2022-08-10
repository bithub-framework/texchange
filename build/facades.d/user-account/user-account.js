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
exports.UserAccountFacade = void 0;
const secretary_like_1 = require("secretary-like");
const events_1 = require("events");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let UserAccountFacade = class UserAccountFacade extends events_1.EventEmitter {
    constructor(vmctx, accountSpec, useCaseSubscription, instant, admin, config) {
        super();
        this.vmctx = vmctx;
        this.accountSpec = accountSpec;
        this.useCaseSubscription = useCaseSubscription;
        this.instant = instant;
        this.admin = admin;
        this.config = config;
        this.LEVERAGE = this.accountSpec.LEVERAGE;
        this.TAKER_FEE_RATE = this.accountSpec.TAKER_FEE_RATE;
        this.MAKER_FEE_RATE = this.accountSpec.MAKER_FEE_RATE;
        this.useCaseSubscription.on('positions', async (positions) => {
            try {
                await this.vmctx.timeline.sleep(this.config.processing);
                await this.vmctx.timeline.sleep(this.config.ping);
                this.emit('positions', this.vmctx.DataTypes.positionsFactory.create(positions));
            }
            catch (err) { }
        });
        this.useCaseSubscription.on('balances', async (balances) => {
            try {
                await this.vmctx.timeline.sleep(this.config.processing);
                await this.vmctx.timeline.sleep(this.config.ping);
                this.emit('balances', this.vmctx.DataTypes.balancesFactory.create(balances));
            }
            catch (err) { }
        });
        this.useCaseSubscription.on('error', async (err) => {
            try {
                await this.vmctx.timeline.sleep(this.config.processing);
                await this.vmctx.timeline.sleep(this.config.ping);
                this.emit('error', err);
            }
            catch (err) { }
        });
    }
    async makeOrders($orders) {
        try {
            const orders = $orders.map(order => this.vmctx.DataTypes.limitOrderFactory.create(order));
            await this.vmctx.timeline.sleep(this.config.ping);
            await this.vmctx.timeline.sleep(this.config.processing);
            assert(this.admin.$s.getReadyState() === "STARTED" /* STARTED */, new secretary_like_1.ExchangeUnavailable());
            return this.instant.makeOrders(orders).map(order => order instanceof Error
                ? order
                : this.vmctx.DataTypes.openOrderFactory.create(order));
        }
        finally {
            await this.vmctx.timeline.sleep(this.config.ping);
        }
    }
    async amendOrders($amendments) {
        try {
            const amendments = $amendments.map(amendment => this.vmctx.DataTypes.amendmentFactory.create(amendment));
            await this.vmctx.timeline.sleep(this.config.ping);
            await this.vmctx.timeline.sleep(this.config.processing);
            assert(this.admin.$s.getReadyState() === "STARTED" /* STARTED */, new secretary_like_1.ExchangeUnavailable());
            return this.instant.amendOrders(amendments).map(order => order instanceof Error
                ? order
                : this.vmctx.DataTypes.openOrderFactory.create(order));
        }
        finally {
            await this.vmctx.timeline.sleep(this.config.ping);
        }
    }
    async cancelOrders($orders) {
        try {
            const orders = $orders.map(order => this.vmctx.DataTypes.openOrderFactory.create(order));
            await this.vmctx.timeline.sleep(this.config.ping);
            await this.vmctx.timeline.sleep(this.config.processing);
            assert(this.admin.$s.getReadyState() === "STARTED" /* STARTED */, new secretary_like_1.ExchangeUnavailable());
            return this.instant.cancelOrders(orders).map(order => order instanceof Error
                ? order
                : this.vmctx.DataTypes.openOrderFactory.create(order));
        }
        finally {
            await this.vmctx.timeline.sleep(this.config.ping);
        }
    }
    async getBalances() {
        try {
            await this.vmctx.timeline.sleep(this.config.ping);
            await this.vmctx.timeline.sleep(this.config.processing);
            assert(this.admin.$s.getReadyState() === "STARTED" /* STARTED */, new secretary_like_1.ExchangeUnavailable());
            return this.vmctx.DataTypes.balancesFactory.create(this.instant.getBalances());
        }
        finally {
            await this.vmctx.timeline.sleep(this.config.ping);
        }
    }
    async getPositions() {
        try {
            await this.vmctx.timeline.sleep(this.config.ping);
            await this.vmctx.timeline.sleep(this.config.processing);
            assert(this.admin.$s.getReadyState() === "STARTED" /* STARTED */, new secretary_like_1.ExchangeUnavailable());
            return this.vmctx.DataTypes.positionsFactory.create(this.instant.getPositions());
        }
        finally {
            await this.vmctx.timeline.sleep(this.config.ping);
        }
    }
    async getOpenOrders() {
        try {
            await this.vmctx.timeline.sleep(this.config.ping);
            await this.vmctx.timeline.sleep(this.config.processing);
            assert(this.admin.$s.getReadyState() === "STARTED" /* STARTED */, new secretary_like_1.ExchangeUnavailable());
            return this.instant.getOpenOrders().map(order => order instanceof Error
                ? order
                : this.vmctx.DataTypes.openOrderFactory.create(order));
        }
        finally {
            await this.vmctx.timeline.sleep(this.config.ping);
        }
    }
};
UserAccountFacade = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vmctx)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.USE_CASES.subscription)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.FACADES.instant)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.FACADES.admin)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.FACADES.config))
], UserAccountFacade);
exports.UserAccountFacade = UserAccountFacade;
//# sourceMappingURL=user-account.js.map