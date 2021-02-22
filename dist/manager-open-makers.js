import { Length, Operation, } from './interfaces';
import Big from 'big.js';
import assert from 'assert';
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
            margin: order.operation === Operation.OPEN
                ? this.config.calcFrozenMargin(this.config, order, this.getSettlementPrice(), this.getLatestPrice()).round(this.config.CURRENCY_DP)
                : new Big(0),
            position: order.operation === Operation.CLOSE
                ? order.unfilled
                : new Big(0),
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
            margin: this.calcThawedMargin(order.unfilled, frozen.margin, volume, dollarVolume),
            position: volume,
            length: order.length,
        };
        frozen.margin = frozen.margin.minus(thawed.margin);
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
            return {
                margin: new Big(0),
                position: new Big(0),
                length: Length.LONG,
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
    calcThawedMargin(unfilled, frozenMargin, volume, dollarVolume) {
        let thawedMargin = dollarVolume.div(this.config.LEVERAGE)
            .round(this.config.CURRENCY_DP);
        if (thawedMargin.gt(frozenMargin) || volume.eq(unfilled))
            thawedMargin = frozenMargin;
        return thawedMargin;
    }
}
export { OpenMakerManager as default, OpenMakerManager, };
//# sourceMappingURL=manager-open-makers.js.map