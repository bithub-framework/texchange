import { OPEN, CLOSE, } from './interfaces';
import Big from 'big.js';
import assert from 'assert';
class OpenOrderManager extends Map {
    constructor(config, getSettlementPrice, getLatestPrice) {
        super();
        this.config = config;
        this.getSettlementPrice = getSettlementPrice;
        this.getLatestPrice = getLatestPrice;
        this.frozens = new Map();
    }
    addOrder(order) {
        const frozen = {
            margin: order.operation === OPEN
                ? this.config.calcFrozenMargin(this.config, order, this.getSettlementPrice(), this.getLatestPrice()).round(this.config.CURRENCY_DP)
                : new Big(0),
            position: order.operation === CLOSE
                ? order.quantity
                : new Big(0),
            length: order.length,
        };
        if (order.quantity.gt(0)) {
            this.set(order.id, order);
            this.frozens.set(order.id, frozen);
        }
        return frozen;
    }
    takeOrder(oid, volume, dollarVolume) {
        const order = this.get(oid);
        assert(order);
        const frozen = this.frozens.get(oid);
        assert(volume.lte(order.quantity));
        const thawed = {
            margin: this.calcThawedMargin(order.quantity, frozen.margin, volume, dollarVolume),
            position: volume,
            length: order.length,
        };
        frozen.margin = frozen.margin.minus(thawed.margin);
        frozen.position = frozen.position.minus(thawed.position);
        order.quantity = order.quantity.minus(volume);
        if (order.quantity.eq(0)) {
            this.delete(oid);
            this.frozens.delete(oid);
        }
        return thawed;
    }
    removeOrder(oid) {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid);
        if (!order)
            return {
                margin: new Big(0),
                position: new Big(0),
                length: 1,
            };
        const thawed = {
            margin: frozen.margin,
            position: frozen.position,
            length: order.length,
        };
        this.delete(oid);
        this.frozens.delete(oid);
        return thawed;
    }
    calcThawedMargin(quantity, frozenMargin, volume, dollarVolume) {
        let thawedMargin = dollarVolume.div(this.config.LEVERAGE)
            .round(this.config.CURRENCY_DP);
        if (thawedMargin.gt(frozenMargin) || volume.eq(quantity))
            thawedMargin = frozenMargin;
        return thawedMargin;
    }
}
export { OpenOrderManager as default, OpenOrderManager, };
//# sourceMappingURL=manager-open-orders.js.map