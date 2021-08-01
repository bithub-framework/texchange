"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMakerManager = exports.default = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class OpenMakerManager extends Map {
    constructor(config, getSettlementPrice, getLatestPrice) {
        super();
        this.config = config;
        this.getSettlementPrice = getSettlementPrice;
        this.getLatestPrice = getLatestPrice;
        this.frozens = new Map();
    }
    addOrder(order) {
        const frozen = {
            balance: order.operation === interfaces_1.Operation.OPEN
                ? this.config.calcFrozenMargin(this.config, order, this.getSettlementPrice(), this.getLatestPrice()).round(this.config.CURRENCY_DP)
                : new big_js_1.default(0),
            position: order.operation === interfaces_1.Operation.CLOSE
                ? order.unfilled
                : new big_js_1.default(0),
            length: order.length,
        };
        if (order.unfilled.gt(0)) {
            this.set(order.id, order);
            this.frozens.set(order.id, frozen);
        }
        return frozen;
    }
    takeOrder(oid, volume, dollarVolume) {
        const order = this.get(oid);
        assert(order);
        const frozen = this.frozens.get(oid);
        assert(volume.lte(order.unfilled));
        const thawed = {
            balance: order.operation === interfaces_1.Operation.OPEN
                ? this.calcThawedBalance(order.unfilled, frozen.balance, volume, dollarVolume) : new big_js_1.default(0),
            position: order.operation === interfaces_1.Operation.CLOSE
                ? volume
                : new big_js_1.default(0),
            length: order.length,
        };
        frozen.balance = frozen.balance.minus(thawed.balance);
        frozen.position = frozen.position.minus(thawed.position);
        order.filled = order.filled.plus(volume);
        order.unfilled = order.unfilled.minus(volume);
        if (order.unfilled.eq(0)) {
            this.delete(oid);
            this.frozens.delete(oid);
        }
        return thawed;
    }
    removeOrder(oid) {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid);
        if (!order)
            return null;
        const thawed = {
            balance: frozen.balance,
            position: frozen.position,
            length: order.length,
        };
        this.delete(oid);
        this.frozens.delete(oid);
        return thawed;
    }
    calcThawedBalance(unfilled, frozenBalance, volume, dollarVolume) {
        let thawedMargin = dollarVolume.div(this.config.LEVERAGE)
            .round(this.config.CURRENCY_DP);
        if (thawedMargin.gt(frozenBalance) || volume.eq(unfilled))
            thawedMargin = frozenBalance;
        return thawedMargin;
    }
}
exports.default = OpenMakerManager;
exports.OpenMakerManager = OpenMakerManager;
//# sourceMappingURL=open-maker-manager.js.map