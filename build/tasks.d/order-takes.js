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
exports.TaskOrderTakes = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let TaskOrderTakes = class TaskOrderTakes {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    $orderTakes($taker) {
        const { assets, progress, book } = this.models;
        const { spec: config, timeline, calc } = this.context;
        const orderbook = book.getBook();
        const trades = [];
        let volume = new this.context.Data.H(0);
        let dollarVolume = new this.context.Data.H(0);
        for (const maker of orderbook[-$taker.side])
            if (($taker.side === secretary_like_1.Side.BID && $taker.price.gte(maker.price) ||
                $taker.side === secretary_like_1.Side.ASK && $taker.price.lte(maker.price)) && $taker.unfilled.gt(0)) {
                const quantity = this.context.Data.H.min($taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                $taker.filled = $taker.filled.plus(quantity);
                $taker.unfilled = $taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(calc.dollarVolume(maker.price, quantity))
                    .round(config.market.CURRENCY_DP);
                trades.push({
                    side: $taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }
        assets.pay(dollarVolume
            .times(config.account.TAKER_FEE_RATE)
            .round(config.market.CURRENCY_DP, secretary_like_1.H.RoundingMode.HALF_AWAY_FROM_ZERO));
        if ($taker.operation === secretary_like_1.Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: $taker.length,
                volume,
                dollarVolume,
            });
        return trades;
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.tasks)
], TaskOrderTakes.prototype, "tasks", void 0);
TaskOrderTakes = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.broadcast))
], TaskOrderTakes);
exports.TaskOrderTakes = TaskOrderTakes;
//# sourceMappingURL=order-takes.js.map