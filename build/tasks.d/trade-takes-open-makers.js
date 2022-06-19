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
exports.TaskTradeTakesOpenMakers = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let TaskTradeTakesOpenMakers = class TaskTradeTakesOpenMakers {
    constructor(context, marketSpec, accountSpec, models) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.models = models;
    }
    tradeTakesOpenMakers(trade) {
        const $trade = this.context.Data.Trade.copy(trade);
        for (const order of [...this.models.makers])
            if (this.$tradeShouldTakeOpenOrder($trade, order)) {
                this.$tradeTakesOrderQueue($trade, order);
                this.tradeTakesOpenMaker($trade, order);
            }
    }
    $tradeShouldTakeOpenOrder($trade, maker) {
        return (maker.side === secretary_like_1.Side.BID &&
            $trade.side === secretary_like_1.Side.ASK &&
            $trade.price.lte(maker.price)
            ||
                maker.side === secretary_like_1.Side.ASK &&
                    $trade.side === secretary_like_1.Side.BID &&
                    $trade.price.gte(maker.price));
    }
    $tradeTakesOrderQueue($trade, maker) {
        const { makers } = this.models;
        if ($trade.price.eq(maker.price)) {
            const volume = this.context.Data.H.min($trade.quantity, maker.behind);
            $trade.quantity = $trade.quantity.minus(volume);
            makers.takeOrderQueue(maker.id, volume);
        }
        else
            makers.takeOrderQueue(maker.id);
    }
    tradeTakesOpenMaker($trade, maker) {
        const { assets, makers } = this.models;
        const volume = this.context.Data.H.min($trade.quantity, maker.unfilled);
        const dollarVolume = this.marketSpec
            .dollarVolume(maker.price, volume)
            .round(this.marketSpec.CURRENCY_DP);
        $trade.quantity = $trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);
        assets.pay(dollarVolume
            .times(this.accountSpec.MAKER_FEE_RATE)
            .round(this.marketSpec.CURRENCY_DP, secretary_like_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if (maker.operation === secretary_like_1.Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: maker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: maker.length,
                volume,
                dollarVolume,
            });
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.tasks)
], TaskTradeTakesOpenMakers.prototype, "tasks", void 0);
TaskTradeTakesOpenMakers = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.models))
], TaskTradeTakesOpenMakers);
exports.TaskTradeTakesOpenMakers = TaskTradeTakesOpenMakers;
//# sourceMappingURL=trade-takes-open-makers.js.map