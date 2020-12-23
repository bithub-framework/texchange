import Big from 'big.js';
class OpenOrderManager {
    constructor(config) {
        this.config = config;
        this.openOrders = new Map();
        this.frozens = new Map();
    }
    addOrder(oid, limit) {
        const order = { ...limit, id: oid };
        if (order.quantity.eq(0))
            return [
                order,
                {
                    margin: new Big(0),
                    position: new Big(0),
                    length: order.open ? order.side : -order.side,
                }
            ];
        this.openOrders.set(oid, order);
        const dollarVolume = this.config.calcDollarVolume(order.price, order.quantity);
        const info = {
            margin: order.open
                ? dollarVolume.div(this.config.leverage)
                    .round(this.config.CURRENCY_DP, 3 /* RoundUp */)
                : new Big(0),
            position: order.open
                ? new Big(0)
                : order.quantity,
            length: order.open ? order.side : -order.side,
        };
        this.frozens.set(oid, info);
        return [order, info];
    }
    take(oid, volume, dollarVolume) {
        const order = this.openOrders.get(oid);
        const frozen = this.frozens.get(oid);
        if (!order)
            throw ('Order not found.');
        const thawed = {
            margin: this.calcReleasedMargin(order.quantity, frozen.margin, volume, dollarVolume),
            position: volume,
            length: order.open ? order.side : -order.side,
        };
        frozen.margin = frozen.margin.minus(thawed.margin);
        frozen.position = frozen.position.minus(thawed.position);
        order.quantity = order.quantity.minus(volume);
        if (order.quantity.eq(0)) {
            this.openOrders.delete(oid);
            this.frozens.delete(oid);
        }
        return thawed;
    }
    delete(oid) {
        const order = this.openOrders.get(oid);
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
            length: order.open ? order.side : -order.side,
        };
        this.openOrders.delete(oid);
        this.frozens.delete(oid);
        return thawed;
    }
    getOpenOrders() {
        return this.openOrders;
    }
    calcReleasedMargin(quantity, frozenMargin, volume, dollarVolume) {
        let thawedMargin = dollarVolume.div(this.config.leverage)
            .round(this.config.CURRENCY_DP);
        if (thawedMargin.gt(frozenMargin) ||
            volume.eq(quantity))
            thawedMargin = frozenMargin;
        return thawedMargin;
    }
}
export { OpenOrderManager as default, OpenOrderManager, };
//# sourceMappingURL=open-order-manager.js.map